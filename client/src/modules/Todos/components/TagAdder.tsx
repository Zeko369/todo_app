import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Stack,
  Box,
  Button,
  Spinner,
  Heading,
  List,
  ListItem,
  Tag,
  TagIcon,
  TagLabel,
} from '@chakra-ui/core';
import { useTagsQuery, useAddTagToTodoMutation } from '../../../generated/graphql';
import Input from '../../../components/Input';

export const TagAdder: React.FC<{ tags: number[]; id: number }> = ({ tags, id }) => {
  const { loading, error, data } = useTagsQuery();
  const [addTagToTodo] = useAddTagToTodoMutation();

  const { register, handleSubmit, watch, setValue } = useForm<{ text: string }>({
    defaultValues: { text: '' },
  });

  const words = watch('text');
  const items = (data?.tags || [])
    .filter((t) => !tags.includes(t.id))
    .filter((tag) => words.split(' ').some((word) => tag.text.includes(word)));

  const addTag = (tagId: number) => async () => await addTagToTodo({ variables: { id, tagId } });

  const onSubmit = async () => {
    if (items.length === 1) {
      await addTag(items[0].id)();
      setValue('');
    }
  };

  return (
    <Stack>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack isInline spacing={3} alignItems="flex-end">
            <Box w="100%">
              <Input
                name="text"
                placeholder="Start typing..."
                label="Search for tag"
                w="100%"
                ref={register({ required: true })}
                isRequired
              />
            </Box>
            <Button type="submit" isDisabled={items.length !== 1}>
              Add tag
            </Button>
          </Stack>
        </form>
      </Box>
      {loading ? (
        <Spinner />
      ) : error || !data ? (
        <Heading size="xl">Error...</Heading>
      ) : (
        <List styleType="dot">
          {items.map((tag) => (
            <ListItem key={tag.id} mb={1}>
              <Tag variantColor={tag.color || undefined}>
                <TagIcon cursor="pointer" onClick={addTag(tag.id)} icon="add" size="12px" />
                <TagLabel>{tag.text}</TagLabel>
              </Tag>
            </ListItem>
          ))}
        </List>
      )}
    </Stack>
  );
};
