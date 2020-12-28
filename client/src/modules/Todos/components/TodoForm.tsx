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
  Tag,
  TagIcon,
  TagLabel,
} from '@chakra-ui/core';

import Input from '../../../components/Input';
import {
  useCreateTodoMutation,
  useUpdateTodoMutation,
  Todo as TodoDB,
  List as ListDB,
  useCreateTodoWithListMutation,
  TagsQuery,
  ListsQuery,
  useAddTagsToTodoMutation,
  useRemoveTodoFromListMutation,
  useConnectTodoToListMutation,
} from '../../../generated/graphql';
import { TODOS_QUERY } from '../graphql/queries';
import { QueryResult } from '@apollo/client';

interface Props {
  todo?: Pick<TodoDB, 'id' | 'title' | 'description'> & { list?: Pick<ListDB, 'id'> | null };
  listsQuery: QueryResult<ListsQuery, {}>;
  tagsQuery: QueryResult<TagsQuery, {}>;
  close?: () => void;
}

interface FormData {
  title: string;
  description?: string | null;
  list?: string;
}

const refetch = { refetchQueries: [{ query: TODOS_QUERY }] };

const TodoForm = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { todo, close, listsQuery, tagsQuery } = props;

  const { loading: lLoading, error: lError, data: lData } = listsQuery;
  const { loading: tLoading, error: tError, data: tData } = tagsQuery;

  const first = lLoading || lError || !lData ? -1 : lData.lists[0]?.id || -1;

  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<number[]>([]);

  const { register, handleSubmit, reset, getValues, setValue } = useForm<FormData>({
    defaultValues: {
      title: todo?.title || '',
      description: todo?.description,
      list: String(todo?.id ? todo?.list?.id || -1 : todo?.list?.id || first),
    },
  });

  const [createTodoWithList] = useCreateTodoWithListMutation(refetch);
  const [addTagsToTodo] = useAddTagsToTodoMutation(refetch);
  const [createTodo] = useCreateTodoMutation(refetch);
  const [updateTodo] = useUpdateTodoMutation(refetch);
  const [removeTodoFromList] = useRemoveTodoFromListMutation(refetch);
  const [connectTodoToList] = useConnectTodoToListMutation(refetch);

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
        console.log('first');
        await updateTodo({ variables: { id: todo.id, ...attrs } });

        if (todo.list?.id && data.list === '-1') {
          console.log('here');
          await removeTodoFromList({ variables: { id: todo.id } });
        } else if (attrs.listId && (!todo.list?.id || attrs.listId !== todo.list.id)) {
          await connectTodoToList({ variables: { id: todo.id, listId: attrs.listId } });
        }
      } else {
        let id: number = -1;

        if (attrs.listId) {
          const { data } = await createTodoWithList({ variables: attrs });
          if (data) {
            id = data.createOneTodo.id;
          }
        } else {
          const { data } = await createTodo({ variables: attrs });
          if (data) {
            id = data.createOneTodo.id;
          }
        }

        if (selected && id !== -1) {
          await addTagsToTodo({ variables: { id, tags: selected.map((id) => ({ id })) } });
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      reset({ list: data.list || '-1' });
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
          {lLoading ? (
            <Spinner />
          ) : lError || !lData ? (
            <Heading size="xl">Error :(</Heading>
          ) : (
            <Stack isInline>
              <Select name="list" ref={register}>
                {lData.lists.map((list) => (
                  <option key={list.id} value={list.id}>
                    {list.title}
                  </option>
                ))}
                <option value="-1">Select list...</option>
              </Select>
              <Button onClick={() => setValue('list', '-1')} variantColor="blue">
                None
              </Button>
              <Button onClick={() => setValue('list', String(first))} variantColor="orange">
                First
              </Button>
            </Stack>
          )}

          {tLoading ? (
            <Spinner />
          ) : tError || !tData ? (
            <Heading size="xl">Error...</Heading>
          ) : (
            <Box>
              {tData.tags.map((tag) => (
                <Box key={tag.id} d="inline-block" mr={2} mb={2}>
                  <Tag
                    variant={selected.includes(tag.id) ? 'solid' : 'subtle'}
                    variantColor={tag.color || undefined}
                    cursor="pointer"
                    onClick={() =>
                      setSelected((curr) =>
                        curr.includes(tag.id) ? curr.filter((a) => a !== tag.id) : [...curr, tag.id]
                      )
                    }
                  >
                    <TagIcon icon="add" size="12px" />
                    <TagLabel>{tag.text}</TagLabel>
                  </Tag>
                </Box>
              ))}
            </Box>
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
