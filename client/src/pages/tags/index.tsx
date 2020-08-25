import React, { useState } from 'react';
import { NextPage } from 'next';
import {
  Box,
  Spinner,
  Heading,
  Text,
  Tag,
  Grid,
  Flex,
  Button,
  Stack,
  IconButton,
} from '@chakra-ui/core';
import { useForm } from 'react-hook-form';

import Nav from '../../components/Nav';
import { LinkIconButton } from '../../components/Link';
import {
  useTagsQuery,
  Tag as TagDB,
  useCreateTagMutation,
  useDeleteTagMutation,
} from '../../generated/graphql';
import useToggle from '../../hooks/useToggle';
import Input from '../../components/Input';
import { TAGS_QUERY } from '../../graphql/queries';

type ITag = Pick<TagDB, 'text'>;

const Tags: NextPage = () => {
  const { handleSubmit, register, setValue } = useForm<ITag>();

  const { loading, error, data } = useTagsQuery();
  const [createTag] = useCreateTagMutation({ refetchQueries: [{ query: TAGS_QUERY }] });
  const [deleteTag] = useDeleteTagMutation({ refetchQueries: [{ query: TAGS_QUERY }] });

  const [showNew, toggleNew, setNew] = useToggle();
  const [editingId, setEditingId] = useState(-1);

  const onSubmit = async (data: ITag) => {
    await createTag({ variables: { ...data } });
    setValue('text', '');
  };

  const edit = (id: number, text: string) => () => {
    setEditingId(id);
    setValue('text', text);
    setNew(true);
  };

  const remove = (id: number) => async () => {
    if (confirm('Are you sure?')) {
      await deleteTag({ variables: { id } });
    }
  };

  return (
    <Box w="90%" maxW="1000px" m="0 auto">
      <Nav>
        <Button onClick={toggleNew} variantColor="blue">
          {showNew ? 'Hide new' : 'Show new'}
        </Button>
      </Nav>
      {showNew && (
        <Box mb="5">
          <Heading>{editingId === -1 ? 'Add new tag' : `Editing tag-[${editingId}]`}</Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <Input name="text" ref={register({ required: true })} isRequired />
              <Button type="submit">Create</Button>
            </Stack>
          </form>
        </Box>
      )}
      {loading ? (
        <Spinner />
      ) : error || !data ? (
        <Heading size="xl">Error :(</Heading>
      ) : (
        <Box>
          {data.tags.map((tag) => (
            <Tag key={tag.id} cursor="pointer" d="inline-block" mr={4} mb={4}>
              <Stack isInline alignItems="center" spacing={3} mt="4px">
                <Text lineHeight="24px" h="24px" mr={10}>
                  [{tag.todos.length}] <b>{tag.text}</b>
                </Text>
                <Stack isInline spacing={1}>
                  <IconButton
                    aria-label="edit"
                    onClick={edit(tag.id, tag.text)}
                    variant="ghost"
                    variantColor="green"
                    icon="edit"
                    size="xs"
                  />
                  <IconButton
                    aria-label="edit"
                    onClick={remove(tag.id)}
                    variant="ghost"
                    variantColor="red"
                    icon="delete"
                    size="xs"
                  />
                </Stack>
              </Stack>
            </Tag>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Tags;
