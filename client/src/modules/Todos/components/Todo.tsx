import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Flex,
  IconButton,
  Heading,
  Text,
  Stack,
  Button,
  Tag,
  TagCloseButton,
  TagLabel,
  Checkbox,
  Input,
  Spinner,
  HStack,
} from '@chakra-ui/react';
import {
  ChatIcon,
  CheckIcon,
  DeleteIcon,
  EditIcon,
  LockIcon,
  MinusIcon,
  SettingsIcon,
  UnlockIcon,
  ViewIcon,
  ViewOffIcon,
} from '@chakra-ui/icons';

import { Select } from '../../../components/Select';
import useToggle from '../../../hooks/useToggle';
import TodoForm from './TodoForm';
import {
  useRemoveTagFromTodoMutation,
  useCheckTaskMutation,
  useCheckTodoMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useUpdatePinTodoMutation,
} from '../../../generated/graphql';
import useMediaQuery from '../../../hooks/useMedia';
import { TODO_QUERY } from '../graphql/queries';
import { apolloOptions } from '../pages';
import { TagAdder } from './TagAdder';
import { RevIf } from '../../../components/RevIf';
import { loadingWrapper } from '../lib/loadingWrapper';
import { AddNewTask } from './AddNewTask';
import { TodoProps, Task as PickTask } from '../ts/todo';
import { Comments } from './Comments';

export const refetchTodo = (id: number) => ({
  refetchQueries: [{ query: TODO_QUERY, variables: { id } }],
});

const Todo: React.FC<TodoProps> = (props) => {
  const {
    todo,
    remove,
    saveList,
    tagsQuery,
    listsQuery,
    mass,
    massSelect,
    massClick,
    selectedTags,
  } = props;
  const { id, title, description, checked, list, tags, tasks, pinned, comments } = todo;

  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<number>(list?.id || -1);
  const [editingTask, setEditingTask] = useState<number>(-1);
  const [taskTitle, setTaskTitle] = useState<string>('');

  const [checkTodo] = useCheckTodoMutation(apolloOptions);
  const [removeTagFromTodo] = useRemoveTagFromTodoMutation();
  const [checkTask] = useCheckTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [updatePinTodo] = useUpdatePinTodoMutation(refetchTodo(todo.id));
  const [deleteTask] = useDeleteTaskMutation(refetchTodo(todo.id));

  const editTask = (task: { id: number; title: string }) => () => {
    setTaskTitle(task.title);
    setEditingTask(task.id);
  };

  const runDelete = (id: number) => () => {
    if (confirm('are you sure')) {
      deleteTask({ variables: { id } });
    }
  };

  const onSubmitUpdateTask = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await updateTask({ variables: { id: editingTask, title: taskTitle } });
    setEditingTask(-1);
  };

  const [showUpdate, toggleUpdate, setUpdate] = useToggle();
  const [showButtons, toggleButtons] = useToggle();
  const [localCompact, toggleCompact] = useToggle();
  const [localComments, toggleComments] = useToggle();

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
  const onLock = loader(() => updatePinTodo({ variables: { id, pinned: !pinned } }));

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
      listsQuery={listsQuery}
      tagsQuery={tagsQuery}
    />
  ) : (
    <Box p={4} shadow="md" borderWidth="1px">
      <Flex justify="space-between" pos="relative">
        <Stack mr="4">
          <IconButton
            icon={(mass ? massSelect : checked) ? <CheckIcon /> : <MinusIcon />}
            colorScheme={(mass ? massSelect : checked) ? (mass ? 'blue' : 'green') : 'gray'}
            aria-label="check"
            isLoading={loading}
            onClick={mass ? onMass : onCheck}
          />
          <IconButton
            icon={!compact ? <ViewIcon /> : <ViewOffIcon />}
            colorScheme={compact ? 'gray' : 'pink'}
            aria-label={compact ? 'show' : 'hide'}
            onClick={toggleCompact}
          />
        </Stack>
        <Stack w="100%" spacing={3}>
          <Flex w="100%">
            <Stack w="100%">
              <Heading size="lg" wordBreak="break-all" alignItems="center" display="flex">
                {pinned && <LockIcon color="orange.500" aria-label="pinned" mr="2" />}
                {tasks &&
                  tasks.length > 0 &&
                  `[${tasks.filter((task) => task.checkedAt).length} / ${tasks.length}] `}
                {comments && comments.length > 0 && `{${comments.length} 💬 } `}
                {title}
              </Heading>
              {list?.id && <Heading size="sm">List: {todo.list?.title}</Heading>}
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
                      colorScheme={tag.color || undefined}
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
              {description && (
                <Box>
                  <Heading size="sm">Description: </Heading>
                  <Text wordBreak="break-all" whiteSpace="pre-wrap">
                    {description}
                  </Text>
                </Box>
              )}
            </Stack>
            <RevIf
              cond={isMobile || false}
              one={
                <Stack spacing={1} isInline={!isMobile} ml="4">
                  <IconButton
                    icon={<SettingsIcon />}
                    size="sm"
                    aria-label="show controls"
                    onClick={toggleButtons}
                    colorScheme={!showButtons ? 'gray' : 'blue'}
                  />
                  <IconButton
                    icon={<EditIcon />}
                    size="sm"
                    aria-label="Update"
                    isLoading={loading}
                    onClick={toggleUpdate}
                  />
                  <IconButton
                    icon={<ChatIcon />}
                    size="sm"
                    colorScheme={!localComments ? 'gray' : 'orange'}
                    aria-label={localComments ? 'show' : 'hide'}
                    onClick={toggleComments}
                  />
                </Stack>
              }
            >
              {!hideButtons && (
                <Stack spacing={3} isInline={!isMobile} ml="4">
                  <IconButton
                    icon={<DeleteIcon />}
                    size="sm"
                    colorScheme="red"
                    aria-label="Delete"
                    isLoading={loading}
                    onClick={onDelete}
                  />

                  <IconButton
                    icon={pinned ? <UnlockIcon /> : <LockIcon />}
                    size="sm"
                    colorScheme="orange"
                    aria-label={pinned ? 'Unlock' : 'Lock'}
                    isLoading={loading}
                    onClick={onLock}
                  />
                </Stack>
              )}
            </RevIf>
          </Flex>
          {localComments && comments && <Comments comments={comments} todoId={id} />}
          {!compact && tasks && (
            <Stack spacing={2}>
              <Heading size="sm">Tasks: </Heading>
              {tasks.map((task) =>
                editingTask === task.id ? (
                  <Flex alignItems="center">
                    <Checkbox
                      key={task.id}
                      isChecked={Boolean(task.checkedAt)}
                      onChange={toggleTask(task)}
                    />

                    <form onSubmit={onSubmitUpdateTask}>
                      <HStack ml="2">
                        <Input
                          isRequired
                          name="title"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setTaskTitle(e.target.value)
                          }
                          value={taskTitle}
                        />
                        <Button type="submit" colorScheme="blue">
                          Save
                        </Button>
                      </HStack>
                    </form>
                  </Flex>
                ) : (
                  <HStack spacing={2}>
                    <Checkbox
                      key={task.id}
                      isChecked={Boolean(task.checkedAt)}
                      onChange={toggleTask(task)}
                      children={task.title}
                    />
                    <IconButton
                      aria-label="edit"
                      icon={<EditIcon />}
                      size="xs"
                      colorScheme="green"
                      variant="ghost"
                      onClick={editTask(task)}
                    />
                    <IconButton
                      aria-label="delete"
                      icon={<DeleteIcon />}
                      size="xs"
                      colorScheme="red"
                      variant="ghost"
                      onClick={runDelete(task.id)}
                    />
                  </HStack>
                )
              )}
              <AddNewTask todoId={todo.id} />
            </Stack>
          )}
        </Stack>
      </Flex>
      {!hideButtons && (
        <Stack spacing={3} mt={5}>
          <HStack spacing={3}>
            {listsQuery.loading ? (
              <Spinner />
            ) : listsQuery.error || !listsQuery.data ? (
              <Heading size="xl">Error :(</Heading>
            ) : (
              <HStack>
                <Select value={selected} onChange={changeList}>
                  {listsQuery.data.lists.map((list) => (
                    <option key={list.id} value={list.id}>
                      {list.title}
                    </option>
                  ))}
                  <option value="-1">Select list...</option>
                </Select>
                <Button onClick={() => setSelected(-1)} colorScheme="blue">
                  None
                </Button>
                <Button
                  onClick={() => setSelected(listsQuery?.data?.lists[0]?.id || -1)}
                  colorScheme="orange"
                >
                  First
                </Button>

                <Button colorScheme="blue" onClick={onSaveList}>
                  Save
                </Button>
              </HStack>
            )}
          </HStack>
          <Box>
            <TagAdder tags={tags?.map((t) => t.id) || []} id={id} />
          </Box>
        </Stack>
      )}
    </Box>
  );
};

export default Todo;
