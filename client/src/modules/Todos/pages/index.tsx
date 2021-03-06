import React, { useState, useRef, useCallback, useMemo } from 'react';
import { NextPage } from 'next';
import {
  Stack,
  Box,
  Heading,
  Button,
  Text,
  Collapse,
  Spinner,
  SimpleGrid,
  IconButton,
  Tag,
  Flex,
  TagLabel,
  HStack,
  TagRightIcon,
} from '@chakra-ui/react';
import { CloseIcon, LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import useSaveToggle, { useSaveCycle } from '../../../hooks/useSaveToggle';
import Todo from '../components/Todo';
import useToggle from '../../../hooks/useToggle';
import TodoForm from '../components/TodoForm';
import useKeyPress from '../../../hooks/useKeyPress';
import {
  useDeleteTodoMutation,
  useRemoveTodoFromListMutation,
  useDeleteManyTodosMutation,
  useAddTodosToListMutation,
  useTagsQuery,
  useAddTagToTodosMutation,
  useConnectTodoToListMutation,
} from '../../../generated/graphql';
import { TODOS_QUERY } from '../graphql/queries';
import Nav from '../../../components/Nav';
import { useSelectTags } from '../../../hooks/useSelectTags';
import { useListsQuery } from '../hooks/useListsQuery';
import { useTodosQuery } from '../hooks/useTodosQuery';
import { Select } from '../../../components/Select';

export const apolloOptions = {
  refetchQueries: [{ query: TODOS_QUERY }],
};

type BaseTodo = { id: number; pinned: boolean };
function sortFunc<T extends BaseTodo>(order: boolean): (t1: T, t2: T) => number {
  return (t1, t2) => {
    const normalOrder = (o: boolean) => (o ? t1.id - t2.id : t2.id - t1.id);

    const pinned = [t1.pinned, t2.pinned].filter(Boolean);

    if (pinned.length === 2) {
      return normalOrder(false);
    } else if (pinned.length === 1) {
      return t1.pinned ? -1 : t2.pinned ? 1 : 0;
    }

    return normalOrder(order);
  };
}

export const HomePage: NextPage = () => {
  const [showShared, toggle] = useSaveToggle('showShared', true);
  const { loading, error, data } = useTodosQuery(showShared, { pollInterval: 2000 });
  const listsQuery = useListsQuery(showShared);
  const tagsQuery = useTagsQuery();

  const { loading: lLoading, error: lError, data: lData } = listsQuery;
  const { loading: tLoading, error: tError, data: tData } = tagsQuery;

  const [selectedList, setSelectedList] = useState<number>(-1);
  const [selectedTag, setSelectedTag] = useState<number>(-1);
  const [massSelected, setMassSelected] = useState<Record<number, boolean>>({});
  const [onlyList, setOnlyList] = useState<number>(-1);

  const [order, toggleOrder] = useSaveToggle('order');
  const [onlyTodo, toggleOnlyTodo] = useSaveToggle('onlyTodo', true);
  const [showNew, , setNew] = useSaveToggle('show:new');
  const [mass, toggleMass] = useToggle(false);
  const [compact, toggleCompact] = useSaveToggle('compact');
  const [tagsCycle, , setCycle] = useSaveCycle('show:tags:cycle', 1, 3);

  const [addTagToTodos] = useAddTagToTodosMutation(apolloOptions);
  const [deleteTodo] = useDeleteTodoMutation(apolloOptions);
  const [deleteManyTodos] = useDeleteManyTodosMutation(apolloOptions);
  const [connectTodoToList] = useConnectTodoToListMutation(apolloOptions);
  const [removeTodoFromList] = useRemoveTodoFromListMutation(apolloOptions);
  const [addTodosToList] = useAddTodosToListMutation(apolloOptions);

  const [selectTag, tagIds] = useSelectTags({ href: '/', as: `/` });

  const smartSwitch = () => {
    switch (tagsCycle) {
      case 0:
        return setCycle(1);
      case 1:
        return setCycle(2);
      case 2:
        return setCycle(1);
    }
  };

  const saveList = async (id: number, listId: number) => {
    if (listId === -1) {
      return removeTodoFromList({ variables: { id } });
    }

    return connectTodoToList({ variables: { id, listId } });
  };

  const remove = async (id: number) => {
    if (confirm('Are you sure?')) {
      deleteTodo({ variables: { id } });
    }
  };

  const massClick = (id: number) => {
    setMassSelected((current) => ({ ...current, [id]: !current[id] }));
  };

  const onChangeList = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOnlyList(parseInt(e.target.value));
  };

  const selected = Object.keys(massSelected)
    .map((k) => (massSelected[parseInt(k)] ? parseInt(k) : undefined))
    .filter(Boolean) as number[];
  const numberOfSelected = selected.length;

  const selectAll = () => {
    const all = Object.keys(massSelected).length !== numberOfSelected || numberOfSelected === 0;

    setMassSelected(
      (!loading && !error && data ? data.todos.map((t) => t.id) : []).reduce(
        (p, c) => ({ ...p, [c]: all }),
        {} as Record<number, boolean>
      )
    );
  };

  const bulkDelete = async () => {
    if (confirm(`Are you sure you want to delete [${selected.join(', ')}] Todos?`)) {
      const countAfter = await deleteManyTodos({ variables: { ids: selected } });
      if (countAfter.data?.deleteManyTodo.count !== numberOfSelected) {
        console.log(countAfter, numberOfSelected);
        console.log('Something went wrong');
      }
      setMassSelected({});
    }
  };

  const bulkChangeList = async () => {
    if (selectedList === -1) {
      return alert(`Can't do that yet`);
    }

    await addTodosToList({
      variables: { listId: selectedList, todos: selected.map((id) => ({ id })) },
    });
  };

  const bulkTag = async () => {
    if (selectedTag === -1) {
      return alert(`Can't do that yet`);
    }

    await addTagToTodos({
      variables: { id: selectedTag, todos: selected.map((id) => ({ id })) },
    });
  };

  const newRef = useRef<HTMLInputElement>(null);
  useKeyPress('n', (down, event) => {
    if (down) {
      console.log(event?.target);
      openNew();
    }
  });

  const openNew = useCallback(() => {
    setNew(true);
    setTimeout(() => {
      newRef.current?.focus();
    }, 1);
  }, []);

  const toggleNew = useCallback(() => (showNew ? setNew(false) : openNew()), [showNew]);
  const filteredData = useMemo(() => [...(data?.todos || [])].sort(sortFunc(order)), [data, order]);

  if (loading || error) {
    return (
      <Box w="90%" maxW="1000px" m="0 auto">
        <Nav>
          <Spinner />
        </Nav>
      </Box>
    );
  }

  return (
    <Box w="90%" maxW="1000px" m="0 auto" pb="10">
      <Nav>
        <Text>
          <b>Done: </b>
          {`${filteredData.filter((a) => a.checked).length} / ${filteredData.length}`}
        </Text>
        <Button onClick={toggle} ml="2">
          {!showShared ? `!` : ''}shared
        </Button>
        <Button onClick={toggleNew} colorScheme="blue">
          {showNew ? '-new' : '+new'}
        </Button>
      </Nav>
      <SimpleGrid columns={[1, null, 2]} spacingX="20px" spacingY="10px" mb="3">
        <HStack>
          <Button onClick={toggleOrder} colorScheme="cyan">
            {order ? 'ASC' : 'DESC'}
          </Button>
          <Button onClick={toggleOnlyTodo} colorScheme={onlyTodo ? 'green' : undefined}>
            {onlyTodo ? 'Only Todo' : 'All'}
          </Button>
          <Button
            onClick={toggleMass}
            leftIcon={mass ? <ViewIcon /> : <ViewOffIcon />}
            colorScheme={mass ? 'yellow' : undefined}
          >
            mass
          </Button>
          <Button
            onClick={smartSwitch}
            leftIcon={
              tagsCycle === 0 ? <ViewOffIcon /> : tagsCycle === 1 ? <ViewIcon /> : <LockIcon />
            }
            colorScheme={tagsCycle > 0 ? 'purple' : undefined}
          >
            tags
          </Button>
          <IconButton
            onClick={toggleCompact}
            aria-label={compact ? 'Compact' : 'Wide'}
            colorScheme={!compact ? 'pink' : undefined}
            icon={!compact ? <ViewIcon /> : <ViewOffIcon />}
          />
        </HStack>
        <HStack justify="flex-end">
          <Box>
            {lLoading ? (
              <Spinner />
            ) : lError || !lData ? (
              <Heading size="xl">Something went wrong</Heading>
            ) : (
              <Select onChange={onChangeList} value={onlyList}>
                <option value={-1}>ALL LISTS</option>
                <option value={-2}>NO LISTS</option>
                {lData?.lists.map((list) => (
                  <option key={list.id} value={list.id}>
                    {list.title}
                  </option>
                ))}
              </Select>
            )}
          </Box>

          <Button onClick={() => setOnlyList(-2)}>No list</Button>
          <Button onClick={() => setOnlyList(-1)}>All list</Button>
        </HStack>
      </SimpleGrid>
      {mass && (
        <Stack spacing={2} mb={3}>
          <Box>Selected: {numberOfSelected}</Box>
          <Button onClick={selectAll} colorScheme="yellow">
            Select all
          </Button>
          <SimpleGrid columns={[2, null, 6]} spacingX="20px" spacingY="10px">
            <Button onClick={bulkDelete} colorScheme="red" isDisabled={numberOfSelected === 0}>
              Bulk delete
            </Button>
            <Button colorScheme="blue" isDisabled={true}>
              Bulk check
            </Button>
            <Button onClick={bulkTag} colorScheme="pink" isDisabled={numberOfSelected === 0}>
              Bulk tag
            </Button>
            {tLoading ? (
              <Spinner />
            ) : tError || !tData ? (
              <Heading size="xl">Something went wrong</Heading>
            ) : (
              <Select
                isDisabled={numberOfSelected === 0}
                value={selectedTag}
                onChange={(e) => setSelectedTag(parseInt(e.target.value))}
              >
                <option value={-1}></option>
                {tData?.tags.map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.text}
                  </option>
                ))}
              </Select>
            )}
            <Button
              onClick={bulkChangeList}
              colorScheme="green"
              isDisabled={numberOfSelected === 0}
            >
              Bulk change list
            </Button>
            {lLoading ? (
              <Spinner />
            ) : lError || !lData ? (
              <Heading size="xl">Something went wrong</Heading>
            ) : (
              <Select
                isDisabled={numberOfSelected === 0}
                value={selectedList}
                onChange={(e) => setSelectedList(parseInt(e.target.value))}
              >
                <option value={-1}></option>
                {lData?.lists.map((list) => (
                  <option key={list.id} value={list.id}>
                    {list.title}
                  </option>
                ))}
              </Select>
            )}
          </SimpleGrid>
        </Stack>
      )}
      {tagsCycle > 0 && (
        <Box mb={3}>
          <Heading size="md" mb={2}>
            Tags:
          </Heading>
          {tLoading ? (
            <Spinner />
          ) : tError || !tData ? (
            <Heading size="xl">Something went wrong</Heading>
          ) : (
            <HStack spacing={2}>
              {tData.tags.map((tag) => (
                <Tag
                  key={tag.id}
                  size="sm"
                  colorScheme={tag.color || 'blue'}
                  variant={tagIds.includes(tag.id) ? 'solid' : 'subtle'}
                  as="button"
                  onClick={selectTag(tag.id)}
                >
                  <Flex alignItems="center">
                    <TagLabel>{tag.text}</TagLabel>
                  </Flex>
                </Tag>
              ))}

              <Tag
                size="sm"
                colorScheme="gray"
                as="button"
                variant={tagIds.includes(-2) ? 'solid' : 'subtle'}
                onClick={selectTag(-2)}
              >
                <Flex alignItems="center">
                  <TagLabel>NONE</TagLabel>
                </Flex>
              </Tag>
              <Tag
                size="sm"
                colorScheme="blue"
                as="button"
                onClick={() => {
                  setCycle(0);
                  selectTag(-1);
                }}
              >
                <Flex alignItems="center">
                  <TagLabel>CLEAR</TagLabel>
                  <TagRightIcon as={CloseIcon} size="12px" />
                </Flex>
              </Tag>
            </HStack>
          )}
        </Box>
      )}
      <Collapse in={showNew}>
        <TodoForm close={toggleNew} ref={newRef} listsQuery={listsQuery} tagsQuery={tagsQuery} />
      </Collapse>
      {filteredData.length > 0 ? (
        <Stack spacing={4} shouldWrapChildren mt={10}>
          {filteredData
            .filter((todo) => (onlyTodo ? !todo.checked : true))
            .filter((todo) => {
              if (tagIds.length > 0) {
                if (tagIds[0] === -2) {
                  return todo.tags.length === 0;
                }

                return tagIds[tagsCycle === 2 ? 'every' : 'some']((tid: number) =>
                  todo.tags.map((tag) => tag.id).includes(tid)
                );
              }

              return true;
            })
            .filter((todo) =>
              onlyList === -1 ? true : todo.list ? todo.list.id === onlyList : onlyList === -2
            )
            .map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                saveList={saveList}
                remove={remove}
                selectedTags={tagIds}
                listsQuery={listsQuery}
                tagsQuery={tagsQuery}
                mass={mass}
                compact={compact}
                massSelect={massSelected[todo.id]}
                massClick={massClick}
              />
            ))}
        </Stack>
      ) : (
        <Heading fontSize="1.75em">No data :(</Heading>
      )}
    </Box>
  );
};
