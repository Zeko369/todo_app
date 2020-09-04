import React, { useState, useEffect, useCallback } from 'react';
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
  TagLabel,
  Checkbox,
} from '@chakra-ui/core';

import useToggle from '../../../hooks/useToggle';
import TodoForm from './TodoForm';
import {
  Todo as TodoDB,
  List as ListDB,
  Tag as TagDB,
  Task as TaskDB,
  useRemoveTagFromTodoMutation,
  useCheckTaskMutation,
  useCheckTodoMutation,
} from '../../../generated/graphql';
import useMediaQuery from '../../../hooks/useMedia';
import { TODO_QUERY } from '../graphql/queries';
import { apolloOptions } from '../pages';
import { TagAdder } from './TagAdder';
import { RevIf } from '../../../components/RevIf';
import { loadingWrapper } from '../lib/loadingWrapper';
import { AddNewTask } from './AddNewTask';

type PickLists = Pick<ListDB, 'id' | 'title'>[];
type PickList = Pick<ListDB, 'id'>;
type PickTodo = Pick<TodoDB, 'id' | 'title' | 'description' | 'checked' | 'createdAt'>;
type PickTag = Pick<TagDB, 'id' | 'text' | 'color'>;
type PickTask = Pick<TaskDB, 'id' | 'title' | 'checkedAt'>;

interface TodoProps {
  mass: boolean;
  massSelect: boolean;
  massClick: (id: number) => void;
  lists: PickLists;
  listsLoading: boolean;
  todo: PickTodo & { list?: PickList | null } & { tags?: PickTag[] | null } & { tasks: PickTask[] };
  remove: (id: number) => Promise<unknown>;
  saveList: (id: number, listId: number) => Promise<unknown>;
  selectedTags: number[];
  compact: boolean;
}

const Todo: React.FC<TodoProps> = (props) => {
  const {
    todo,
    remove,
    saveList,
    lists,
    listsLoading,
    mass,
    massSelect,
    massClick,
    selectedTags,
  } = props;
  const { id, title, description, checked, list, tags, tasks } = todo;

  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<number>(list?.id || -1);

  const [checkTodo] = useCheckTodoMutation(apolloOptions);
  const [removeTagFromTodo] = useRemoveTagFromTodoMutation();
  const [checkTask] = useCheckTaskMutation();

  const [showUpdate, toggleUpdate, setUpdate] = useToggle();
  const [showButtons, toggleButtons] = useToggle();
  const [localCompact, toggleCompact] = useToggle();

  const hideButtons = !(showButtons || !true);
  const compact = !(localCompact || !props.compact);

  useEffect(() => {
    if (selected !== list?.id) {
      setSelected(list?.id || -1);
    }
  }, [list?.id]);

  const changeList = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(parseInt(e.target.value));
  };

  const loader = useCallback(loadingWrapper(setLoading), [setLoading]);

  const onDelete = loader(() => remove(id));
  const onSaveList = loader(() => saveList(id, selected));
  const onCheck = loader(() => checkTodo({ variables: { id } }));

  const removeTag = (tagId: number) => async () => {
    await removeTagFromTodo({ variables: { tagId, id } });
  };

  const onMass = () => {
    massClick(id);
  };

  const toggleTask = (task: PickTask) => async () => {
    await checkTask({
      variables: { id: task.id },
      refetchQueries: [{ query: TODO_QUERY, variables: { id: todo.id } }],
    });
  };

  const isMobile = useMediaQuery('(max-width: 576px)');

  return showUpdate ? (
    <TodoForm
      todo={todo}
      close={() => setUpdate(false)}
      lists={lists}
      listsLoading={listsLoading}
    />
  ) : (
    <Box p={4} shadow="md" borderWidth="1px">
      <Flex justify="space-between" pos="relative">
        <Stack>
          <IconButton
            icon={(mass ? massSelect : checked) ? 'check' : 'minus'}
            variantColor={(mass ? massSelect : checked) ? (mass ? 'blue' : 'green') : 'gray'}
            aria-label="check"
            mr={4}
            isLoading={loading}
            onClick={mass ? onMass : onCheck}
          />
          <IconButton
            icon={!compact ? 'view' : 'view-off'}
            variantColor={compact ? 'gray' : 'pink'}
            aria-label={compact ? 'show' : 'hide'}
            mr={4}
            onClick={toggleCompact}
          />
        </Stack>
        <Stack w="100%" spacing={3}>
          <Flex w="100%">
            <Stack w="100%">
              <Heading fontSize="xl" wordBreak="break-all">
                {tasks.length > 0 &&
                  `[${tasks.filter((task) => task.checkedAt).length} / ${tasks.length}] `}
                {title}
              </Heading>
              {list?.id && (
                <Heading size="sm">List: {lists.find((l) => l.id === list.id)?.title}</Heading>
              )}
              {!compact && (
                <Box>
                  <Text color="gray.400">{`[${id}] - ${new Date(
                    todo.createdAt
                  ).toLocaleString()}`}</Text>
                </Box>
              )}
              {tags?.length && (
                <Box>
                  {tags.map((tag) => (
                    <Tag
                      key={tag.id}
                      mr={2}
                      mb={2}
                      variantColor={tag.color || undefined}
                      variant={selectedTags.includes(tag.id) ? 'solid' : 'subtle'}
                    >
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
              cond={isMobile || false}
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
          {!compact && tasks && (
            <Stack>
              <Heading size="sm">Tasks: </Heading>
              {tasks.map((task) => (
                <Checkbox
                  key={task.id}
                  isChecked={Boolean(task.checkedAt)}
                  onChange={toggleTask(task)}
                  children={task.title}
                />
              ))}
              <AddNewTask todoId={todo.id} />
            </Stack>
          )}
          {!compact && description && (
            <Box>
              <Heading size="sm">Description: </Heading>
              <Text wordBreak="break-all">{description}</Text>
            </Box>
          )}
        </Stack>
      </Flex>
      {!hideButtons && (
        <Stack spacing={3} mt={5}>
          <Stack isInline spacing={3}>
            <Select value={selected} onChange={changeList}>
              <option value="-1">Select list...</option>
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
            <TagAdder tags={tags?.map((t) => t.id) || []} id={id} />
          </Box>
        </Stack>
      )}
    </Box>
  );
};

export default Todo;
