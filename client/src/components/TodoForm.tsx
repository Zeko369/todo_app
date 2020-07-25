import React, { useState, forwardRef } from 'react';
import { useForm } from 'react-hook-form';

import { Heading, Stack, Box, Button, Flex, IconButton, Textarea } from '@chakra-ui/core';
import Input from './Input';
import { ITodo, TODOS_QUERY } from '../pages';
import { gql, useMutation } from '@apollo/client';

interface Props {
  todo?: ITodo;
  close?: () => void;
}

const CREATE_TODO = gql`
  mutation CREATE_TODO($title: String!, $description: String) {
    createOneTodo(data: { title: $title, description: $description }) {
      id
      title
      description
    }
  }
`;

const UPDATE_TODO = gql`
  mutation UPDATE_TODO($id: Int!, $title: String, $description: String) {
    updateOneTodo(where: { id: $id }, data: { title: $title, description: $description }) {
      id
      title
      description
    }
  }
`;

const TodoForm = forwardRef<HTMLInputElement, Props>(({ todo, close }, ref) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { title: todo?.title, description: todo?.description },
  });

  const [createTodo] = useMutation(CREATE_TODO, { refetchQueries: [{ query: TODOS_QUERY }] });
  const [updateTodo] = useMutation(UPDATE_TODO, { refetchQueries: [{ query: TODOS_QUERY }] });

  const isUpdate = Boolean(todo);

  const onSubmit = async (data: { title: string; description?: string }) => {
    setLoading(true);

    const attrs = {
      ...data,
      description: data.description?.length === 0 ? null : data.description,
    };

    try {
      if (todo) {
        await updateTodo({ variables: { id: todo.id, ...attrs } });
      } else {
        await createTodo({ variables: attrs });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      reset();
      close && close();
    }
  };

  return (
    <Box p={3} shadow="md" borderWidth="1px" mb={6}>
      <Flex justify="space-between">
        <Heading fontSize="lg" mb={2}>
          {!isUpdate ? 'New TODO' : 'Edit TODO'}
        </Heading>
        {close && (
          <IconButton size="xs" type="button" onClick={close} icon="close" aria-label="close" />
        )}
      </Flex>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Input
            name="title"
            ref={(e) => {
              register(e);
              if (ref) {
                // @ts-expect-error
                ref.current = e;
              }
            }}
            isRequired
            defaultValue={todo?.title}
          />
          <Textarea
            name="description"
            ref={register()}
            placeholder="Description"
            defaultValue={todo?.description || undefined}
          />
          <Stack isInline justify="flex-end">
            <Button type="submit" variantColor="green" isLoading={loading}>
              {!isUpdate ? 'Add' : 'Update'}
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
});

export default TodoForm;
