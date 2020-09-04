import React, { useState, useRef, useCallback, useEffect } from 'react';
import { NextPage } from 'next';
import {
  Stack,
  Box,
  Heading,
  Button,
  Text,
  Collapse,
  Select,
  Spinner,
  SimpleGrid,
  IconButton,
  Tag,
  Flex,
  TagLabel,
  TagIcon,
} from '@chakra-ui/core';

import useSaveToggle, { useSaveCycle } from '../../../hooks/useSaveToggle';
import Todo from '../components/Todo';
import useToggle from '../../../hooks/useToggle';
import TodoForm from '../components/TodoForm';
import useKeyPress from '../../../hooks/useKeyPress';
import {
  useTodosQuery,
  useDeleteTodoMutation,
  useListsQuery,
  useUpdateTodoMutation,
  useRemoveTodoFromListMutation,
  useDeleteManyTodosMutation,
  useAddTodosToListMutation,
  useTagsQuery,
  useAddTagToTodosMutation,
  TodosQueryResult,
  TodosQueryHookResult,
} from '../../../generated/graphql';
import { TODOS_QUERY } from '../graphql/queries';
import Nav from '../../../components/Nav';
import { useSelectTags } from '../../../hooks/useSelectTags';

export const apolloOptions = {
  refetchQueries: [{ query: TODOS_QUERY }],
};

export const HomePage: NextPage = () => {
  const { loading, error, data } = useTodosQuery({ pollInterval: 2000 });
  const { loading: lLoading, error: lError, data: lData } = useListsQuery();
  const { loading: tLoading, error: tError, data: tData } = useTagsQuery();

  const [stats, setStats] = useState<string>('');
  const [selectedList, setSelectedList] = useState<number>(-1);
  const [selectedTag, setSelectedTag] = useState<number>(-1);
  const [massSelected, setMassSelected] = useState<Record<number, boolean>>({});
  const [onlyList, setOnlyList] = useState<number>(-1);

  const [order, toggleOrder] = useSaveToggle('order');
  const [onlyTodo, toggleOnlyTodo] = useSaveToggle('onlyTodo');
  const [showNew, , setNew] = useSaveToggle('show:new');
  const [mass, toggleMass] = useToggle(false);
  const [compact, toggleCompact] = useSaveToggle('compact');
  const [tagsCycle, toggleTagsCycle] = useSaveCycle('show:tags:cycle', 0, 3);

  const [addTagToTodos] = useAddTagToTodosMutation(apolloOptions);
  const [deleteTodo] = useDeleteTodoMutation(apolloOptions);
  const [deleteManyTodos] = useDeleteManyTodosMutation(apolloOptions);
  const [updateTodo] = useUpdateTodoMutation(apolloOptions);
  const [removeTodoFromList] = useRemoveTodoFromListMutation(apolloOptions);
  const [addTodosToList] = useAddTodosToListMutation(apolloOptions);

  const [selectTag, tagIds] = useSelectTags({ href: '/', as: `/` });

  const saveList = async (id: number, listId: number) => {
    if (listId === -1) {
      return removeTodoFromList({ variables: { id } });
    }

    return updateTodo({ variables: { id, listId } });
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

  const toggleNew = useCallback(() => {
    if (showNew) {
      setNew(false);
    } else {
      openNew();
    }
  }, [showNew]);

  const filteredData = new Array(...(data?.todos || [])).sort((t1, t2) =>
    order ? t1.id - t2.id : t2.id - t1.id
  );

  useEffect(() => {
    setStats(`${filteredData.filter((a) => !a.checked).length} / ${filteredData.length}`);
  }, [filteredData]);

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
    <Box w="90%" maxW="1000px" m="0 auto">
      <Nav>
        <Button onClick={toggleNew} variantColor="blue">
          {showNew ? '-new' : '+new'}
        </Button>
      </Nav>
      <Text mb={3}>
        <b>Done: </b>
        {stats}
      </Text>
      <SimpleGrid columns={[1, null, 2]} spacingX="20px" spacingY="10px" mb="3">
        <Stack isInline>
          <Button onClick={toggleOrder} variantColor="cyan">
            {order ? 'ASC' : 'DESC'}
          </Button>
          <Button onClick={toggleOnlyTodo} variantColor={onlyTodo ? 'green' : undefined}>
            {onlyTodo ? 'Only Todo' : 'All'}
          </Button>
          <Button
            onClick={toggleMass}
            leftIcon={mass ? 'view' : 'view-off'}
            variantColor={mass ? 'yellow' : undefined}
          >
            mass
          </Button>
          <Button
            onClick={toggleTagsCycle}
            leftIcon={tagsCycle === 0 ? 'view-off' : tagsCycle === 1 ? 'view' : 'lock'}
            variantColor={tagsCycle > 0 ? 'purple' : undefined}
          >
            tags
          </Button>
          <IconButton
            onClick={toggleCompact}
            aria-label={compact ? 'Compact' : 'Wide'}
            variantColor={!compact ? 'pink' : undefined}
            icon={!compact ? 'view' : 'view-off'}
          />
        </Stack>
        <Stack isInline isReversed>
          <Button onClick={() => setOnlyList(-1)}>All list</Button>
          <Button onClick={() => setOnlyList(-2)}>No list</Button>

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
        </Stack>
      </SimpleGrid>
      {mass && (
        <Stack spacing={2} mb={3}>
          <Box>Selected: {numberOfSelected}</Box>
          <Button onClick={selectAll} variantColor="yellow">
            Select all
          </Button>
          <SimpleGrid columns={[2, null, 6]} spacingX="20px" spacingY="10px">
            <Button onClick={bulkDelete} variantColor="red" isDisabled={numberOfSelected === 0}>
              Bulk delete
            </Button>
            <Button variantColor="blue" isDisabled={true}>
              Bulk check
            </Button>
            <Button onClick={bulkTag} variantColor="pink" isDisabled={numberOfSelected === 0}>
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
              variantColor="green"
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
            Tags:{' '}
          </Heading>
          {tLoading ? (
            <Spinner />
          ) : tError || !tData ? (
            <Heading size="xl">Something went wrong</Heading>
          ) : (
            <Stack isInline spacing={2}>
              {tData.tags.map((tag) => (
                <Tag
                  key={tag.id}
                  size="sm"
                  variantColor={tag.color || 'blue'}
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
                variantColor="gray"
                as="button"
                variant={tagIds.includes(-2) ? 'solid' : 'subtle'}
                onClick={selectTag(-2)}
              >
                <Flex alignItems="center">
                  <TagLabel>NONE</TagLabel>
                </Flex>
              </Tag>
              <Tag size="sm" variantColor="blue" as="button" onClick={selectTag(-1)}>
                <Flex alignItems="center">
                  <TagLabel>CLEAR</TagLabel>
                  <TagIcon icon="close" size="12px" />
                </Flex>
              </Tag>
            </Stack>
          )}
        </Box>
      )}
      <Collapse isOpen={showNew}>
        <TodoForm
          close={toggleNew}
          ref={newRef}
          listsLoading={Boolean(lLoading || lError)}
          lists={lData?.lists || []}
        />
      </Collapse>
      {filteredData.length > 0 ? (
        <Stack spacing={4} shouldWrapChildren>
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
                listsLoading={Boolean(lLoading || lError || !data)}
                lists={lData?.lists || []}
                mass={mass}
                compact={compact}
                massSelect={massSelected[todo.id]}
                massClick={massClick}
              />
            ))}
        </Stack>
      ) : (
        <Heading fontSize={1.75}>No data :(</Heading>
      )}
    </Box>
  );
};
