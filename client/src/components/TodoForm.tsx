import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Heading, Stack, Box, Button } from '@chakra-ui/core';
import Input from './Input';
import config from '../config';
import { mutate } from 'swr';
import { ITodo } from '../ts/api';
import http from '../api/http';

interface Props {
  todo?: ITodo;
  close?: () => void;
}

const TodoForm: React.FC<Props> = ({ todo, close }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { title: todo?.title, description: todo?.description },
  });

  const onSubmit = (data: { title: string; description?: string }) => {
    setLoading(true);
    const method = todo ? http.patch : http.post;

    method(
      config.apiUrl(`/todos${todo ? `/${todo.id}` : ''}`),
      JSON.stringify({
        ...data,
        description: data.description?.length === 0 ? null : data.description,
      })
    )
      .then(() => mutate(config.apiUrl('/todos')))
      .catch((err) => console.error(err))
      .finally(() => {
        setLoading(false);
        reset();
        close && close();
      });
  };

  return (
    <Box p={3} shadow="md" borderWidth="1px" mb={6}>
      <Heading fontSize="lg" mb={2}>
        {!todo ? 'New TODO' : 'Edit TODO'}
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Input name="title" ref={register()} isRequired defaultValue={todo?.title} />
          <Input name="description" ref={register()} defaultValue={todo?.description} />
          <Stack isInline justify="flex-end">
            <Button type="submit" variantColor="green" isLoading={loading}>
              {!todo ? 'Add' : 'Update'}
            </Button>
            {todo && (
              <Button type="button" onClick={close}>
                Close
              </Button>
            )}
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default TodoForm;
