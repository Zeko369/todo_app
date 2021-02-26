import React, { useState } from 'react';
import { NextPage } from 'next';
import {
  Box,
  Spinner,
  Heading,
  Text,
  Tag,
  Button,
  Stack,
  IconButton,
  CloseButton,
  Flex,
  theme,
  HStack,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';

import { Select } from '../../../components/Select';
import Nav from '../../../components/Nav';
import {
  useTagsQuery,
  Tag as TagDB,
  useCreateTagMutation,
  useUpdateTagMutation,
  useDeleteTagMutation,
} from '../../../generated/graphql';
import useToggle from '../../../hooks/useToggle';
import Input from '../../../components/Input';
import { TAGS_QUERY } from '../graphql/queries';

type ITag = Pick<TagDB, 'text' | 'color'>;
const ignoreColors = ['transparent'];
const colors = Object.keys(theme.colors).filter((color) => !ignoreColors.includes(color));

export const TagsPage: NextPage = () => {
  const { handleSubmit, register, reset, setValue, watch } = useForm<ITag>();

  const { loading, error, data } = useTagsQuery();
  const [createTag] = useCreateTagMutation({ refetchQueries: [{ query: TAGS_QUERY }] });
  const [updateTag] = useUpdateTagMutation({ refetchQueries: [{ query: TAGS_QUERY }] });
  const [deleteTag] = useDeleteTagMutation({ refetchQueries: [{ query: TAGS_QUERY }] });

  const [showNew, toggleNew, setNew] = useToggle();
  const [editingId, setEditingId] = useState(-1);

  const color = watch('color');

  const onSubmit = async (data: ITag) => {
    if (editingId !== -1) {
      setEditingId(-1);
      await updateTag({ variables: { id: editingId, ...data } });
    } else {
      await createTag({ variables: { ...data } });
    }

    reset();
  };

  const edit = ({ id, color, text }: Pick<TagDB, 'id' | 'text' | 'color'>) => () => {
    setEditingId(id);
    setValue('text', text);
    setValue('color', color);
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
        <Button onClick={toggleNew} colorScheme="blue">
          {showNew ? 'Hide new' : 'Show new'}
        </Button>
      </Nav>
      {showNew && (
        <Box mb="5">
          <Flex justifyContent="space-between" align="center">
            <Heading>{editingId === -1 ? 'Add new tag' : `Editing tag-[${editingId}]`}</Heading>
            {editingId !== -1 && (
              <CloseButton
                onClick={() => {
                  setEditingId(-1);
                  setValue('text', '');
                }}
              />
            )}
          </Flex>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <Input name="text" ref={register({ required: true })} isRequired />
              <Select
                ref={register({ required: true })}
                isRequired
                name="color"
                bg={`${color}.100`}
                color="black"
              >
                {colors.map((color) => (
                  <option value={color} key={color}>
                    {color}
                  </option>
                ))}
              </Select>
              <Button type="submit">{editingId === -1 ? 'Create' : 'Update'}</Button>
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
            <Tag
              key={tag.id}
              cursor="pointer"
              d="inline-block"
              mr={4}
              mb={4}
              py="1"
              px="2"
              colorScheme={tag.color || undefined}
            >
              <HStack alignItems="center" spacing={3}>
                <Text>
                  [{tag.todos.length}] <b>{tag.text}</b>
                </Text>
                <HStack spacing={1}>
                  <IconButton
                    aria-label="edit"
                    onClick={edit(tag)}
                    variant="ghost"
                    colorScheme="green"
                    icon={<EditIcon />}
                    size="xs"
                  />
                  <IconButton
                    aria-label="edit"
                    onClick={remove(tag.id)}
                    variant="ghost"
                    colorScheme="red"
                    icon={<DeleteIcon />}
                    size="xs"
                  />
                </HStack>
              </HStack>
            </Tag>
          ))}
        </Box>
      )}
    </Box>
  );
};
