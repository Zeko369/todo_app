import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  IconButton,
  Heading,
  Text,
  Stack,
  Select,
  Button,
  Tag,
  TagCloseButton,
  Spinner,
  List,
  ListItem,
  TagIcon,
  TagLabel,
} from '@chakra-ui/core';

import useToggle from '../hooks/useToggle';
import TodoForm from './TodoForm';
import {
  Todo as TodoDB,
  List as ListDB,
  Tag as TagDB,
  useRemoveTagFromTodoMutation,
  useTagsQuery,
  useAddTagToTodoMutation,
} from '../generated/graphql';
import Input from './Input';
import { useForm } from 'react-hook-form';
import useMediaQuery from '../hooks/useMedia';

interface TodoProps {
  mass: boolean;
  massSelect: boolean;
  massClick: (id: number) => void;
  lists: Pick<ListDB, 'id' | 'title'>[];
  todo: Pick<TodoDB, 'id' | 'title' | 'description' | 'checked' | 'createdAt'> & {
    list?: Pick<ListDB, 'id'> | null;
  } & {
    tags?: Pick<TagDB, 'id' | 'text'>[] | null;
  };
  check: (id: number) => Promise<unknown>;
  remove: (id: number) => Promise<unknown>;
  saveList: (id: number, listId: number) => Promise<unknown>;
  hideButtons: boolean;
  compact: boolean;
}

const Todo: React.FC<TodoProps> = (props) => {
  const { todo, check, remove, saveList, lists, mass, massSelect, massClick } = props;
  const { id, title, description, checked, list, tags } = todo;

  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<number>(list?.id || -1);

  const [removeTagFromTodo] = useRemoveTagFromTodoMutation();

  const [showUpdate, toggleUpdate, setUpdate] = useToggle();
  const [showButtons, toggleButtons] = useToggle();
  const [localCompact, toggleCompact] = useToggle();

  const hideButtons = !(showButtons || !props.hideButtons);
  const compact = !(localCompact || !props.compact);

  useEffect(() => {
    if (selected !== list?.id) {
      setSelected(list?.id || -1);
    }
  }, [list?.id]);

  const changeList = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(parseInt(e.target.value));
  };

  const onCheck = () => {
    setLoading(true);
    check(id).finally(() => setLoading(false));
  };

  const onDelete = () => {
    setLoading(true);
    remove(id).finally(() => setLoading(false));
  };

  const onSaveList = () => {
    setLoading(true);
    saveList(id, selected).finally(() => setLoading(false));
  };

  const removeTag = (tagId: number) => async () => {
    await removeTagFromTodo({ variables: { tagId, id } });
  };

  const onMass = () => {
    massClick(id);
  };

  const isMobile = useMediaQuery('(max-width: 576px)');

  return showUpdate ? (
    <TodoForm todo={todo} close={() => setUpdate(false)} />
  ) : (
    <Box p={4} shadow="md" borderWidth="1px" onClick={toggleCompact}>
      <Flex justify="space-between" pos="relative">
        <IconButton
          icon={(mass ? massSelect : checked) ? 'check' : 'minus'}
          variantColor={(mass ? massSelect : checked) ? (mass ? 'blue' : 'green') : 'gray'}
          aria-label="check"
          mr={4}
          isLoading={loading}
          onClick={mass ? onMass : onCheck}
        />
        <Box w="100%">
          <Flex w="100%">
            <Stack w="100%">
              <Heading fontSize="xl" wordBreak="break-all">
                {list?.id && `[${lists.find((l) => l.id === list.id)?.title}] `}
                {title}
              </Heading>
              {!compact && <Text>{`[${id}] - ${new Date(todo.createdAt).toLocaleString()}`}</Text>}
              {tags && (
                <Box mt={2}>
                  {tags.map((tag) => (
                    <Tag key={tag.id} mr={2} mb={2}>
                      <Flex alignItems="center">
                        <TagLabel>{tag.text}</TagLabel>
                        {!hideButtons && <TagCloseButton ml="1" onClick={removeTag(tag.id)} />}
                      </Flex>
                    </Tag>
                  ))}
                </Box>
              )}
            </Stack>
            <RevIf
              cond={isMobile}
              one={
                <IconButton
                  aria-label="show controls"
                  icon="settings"
                  onClick={toggleButtons}
                  variantColor={!showButtons ? 'gray' : 'blue'}
                />
              }
            >
              {!hideButtons && (
                <Stack spacing={3} isInline={!isMobile}>
                  <IconButton
                    icon="delete"
                    variantColor="red"
                    aria-label="Delete"
                    isLoading={loading}
                    onClick={onDelete}
                  />
                  <IconButton
                    icon="edit"
                    variantColor="green"
                    aria-label="Update"
                    isLoading={loading}
                    onClick={toggleUpdate}
                  />
                </Stack>
              )}
            </RevIf>
          </Flex>
          {!compact && description && (
            <Text mt={4} wordBreak="break-all">
              {description}
            </Text>
          )}
        </Box>
      </Flex>
      {!hideButtons && (
        <Stack spacing={3} mt={5}>
          <Stack isInline spacing={3}>
            <Select value={selected} onChange={changeList}>
              <option value={-1}></option>
              {lists.map((list) => (
                <option key={list.id} value={list.id}>
                  {list.title}
                </option>
              ))}
            </Select>
            {todo.list?.id !== selected && (
              <Button variantColor="blue" onClick={onSaveList}>
                Save
              </Button>
            )}
          </Stack>
          <Box>
            <FormThingy tags={tags?.map((t) => t.id) || []} id={id} />
          </Box>
        </Stack>
      )}
    </Box>
  );
};

const FormThingy: React.FC<{ tags: number[]; id: number }> = ({ tags, id }) => {
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
              <Tag>
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

export default Todo;

const RevIf: React.FC<{ cond: boolean; one: React.ReactNode }> = ({ children, cond, one }) => {
  if (cond) {
    return (
      <Stack spacing={3} isInline={!cond}>
        {one}
        {children}
      </Stack>
    );
  }

  return (
    <Stack spacing={3} isInline={!cond}>
      {children}
      {one}
    </Stack>
  );
};
