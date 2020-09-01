import React, { useState, forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import {
  Heading,
  Stack,
  Box,
  Button,
  Flex,
  IconButton,
  Textarea,
  Select,
  Spinner,
} from '@chakra-ui/core';

import Input from '../../../components/Input';
import {
  useCreateTodoMutation,
  useUpdateTodoMutation,
  Todo as TodoDB,
  List as ListDB,
  useCreateTodoWithListMutation,
} from '../../../generated/graphql';
import { TODOS_QUERY } from '../graphql/queries';

interface Props {
  todo?: Pick<TodoDB, 'id' | 'title' | 'description'> & { list?: Pick<ListDB, 'id'> | null };
  lists: Pick<ListDB, 'id' | 'title'>[];
  listsLoading: boolean;
  close?: () => void;
}

interface FormData {
  title: string;
  description?: string | null;
  list?: string;
}

const refetch = { refetchQueries: [{ query: TODOS_QUERY }] };

const TodoForm = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { todo, close, lists, listsLoading } = props;

  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, reset, getValues, setValue } = useForm<FormData>({
    defaultValues: {
      title: todo?.title || '',
      description: todo?.description,
      list: lists ? String(lists[0]?.id || -1) : String(todo?.list?.id || -1),
    },
  });

  const [createTodoWithList] = useCreateTodoWithListMutation(refetch);
  const [createTodo] = useCreateTodoMutation(refetch);
  const [updateTodo] = useUpdateTodoMutation(refetch);

  const isUpdate = Boolean(todo);

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    const attrs = {
      title: data.title,
      description: data.description?.length === 0 ? null : data.description,
      listId: data?.list === '-1' ? null : parseInt(data.list || ''),
    };

    try {
      if (todo) {
        await updateTodo({ variables: { id: todo.id, ...attrs } });
      } else {
        if (attrs.listId) {
          await createTodoWithList({ variables: attrs });
        } else {
          await createTodo({ variables: attrs });
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      reset();
    }
  };

  const onClose = async () => {
    await onSubmit(getValues());
    close && close();
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
            defaultValue={todo?.title || ''}
          />
          <Textarea
            name="description"
            ref={register()}
            placeholder="Description"
            defaultValue={todo?.description || undefined}
          />
          {listsLoading ? (
            <Spinner />
          ) : (
            <Stack isInline>
              <Select name="list" ref={register}>
                {lists.map((list) => (
                  <option key={list.id} value={list.id}>
                    {list.title}
                  </option>
                ))}
                <option value="-1">Select list...</option>
              </Select>
              <Button onClick={() => setValue('list', '-1')} variantColor="blue">
                None
              </Button>
              <Button
                onClick={() => setValue('list', String((lists && lists[0].id) || -1))}
                variantColor="orange"
              >
                First
              </Button>
            </Stack>
          )}

          <Stack isInline justify="flex-end">
            <Button type="submit" variantColor="green" variant="outline" isLoading={loading}>
              {!isUpdate ? 'Add' : 'Update'}
            </Button>
            <Button variantColor="green" isLoading={loading} onClick={onClose}>
              {!isUpdate ? 'Add' : 'Update'} and close
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
});

export default TodoForm;
