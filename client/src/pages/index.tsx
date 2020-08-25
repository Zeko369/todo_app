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
} from '@chakra-ui/core';

import useSaveToggle from '../hooks/useSaveToggle';
import Todo from '../components/Todo';
import useToggle from '../hooks/useToggle';
import TodoForm from '../components/TodoForm';
import useKeyPress from '../hooks/useKeyPress';
import {
  useTodosQuery,
  useCheckTodoMutation,
  useDeleteTodoMutation,
  useListsQuery,
  useUpdateTodoMutation,
  useRemoveTodoFromListMutation,
  useDeleteManyTodoMutation,
  useAddTodosToListMutation,
} from '../generated/graphql';
import { TODOS_QUERY } from '../graphql/queries';
import Nav from '../components/Nav';

const apolloOptions = {
  refetchQueries: [{ query: TODOS_QUERY }],
};

const Home: NextPage = () => {
  const { loading, error, data } = useTodosQuery();
  const { loading: lLoading, error: lError, data: lData } = useListsQuery();

  const [stats, setStats] = useState<string>('');
  const [selectedList, setSelectedList] = useState<number>(-1);
  const [massSelected, setMassSelected] = useState<Record<number, boolean>>({});

  const [order, toggleOrder] = useSaveToggle('order');
  const [onlyTodo, toggleOnlyTodo] = useSaveToggle('onlyTodo');
  const [showNew, , setNew] = useToggle();
  const [mass, toggleMass] = useToggle(false);
  const [hideButtons, toggleButtons] = useSaveToggle('buttons');

  const [checkTodo] = useCheckTodoMutation(apolloOptions);
  const [deleteTodo] = useDeleteTodoMutation(apolloOptions);
  const [deleteManyTodos] = useDeleteManyTodoMutation(apolloOptions);
  const [updateTodo] = useUpdateTodoMutation(apolloOptions);
  const [removeTodoFromList] = useRemoveTodoFromListMutation(apolloOptions);
  const [addTodosToList] = useAddTodosToListMutation(apolloOptions);

  const check = (id: number): Promise<any> => checkTodo({ variables: { id } });
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

  const selected = Object.keys(massSelected)
    .map((k) => (massSelected[parseInt(k)] ? parseInt(k) : undefined))
    .filter(Boolean) as number[];
  const numberOfSelected = selected.length;

  const selectAll = () => {
    const all = Object.keys(massSelected).length !== numberOfSelected;

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
        <Text>{stats}</Text>
        <Button onClick={toggleNew} variantColor="blue">
          {showNew ? 'Hide new' : 'Show new'}
        </Button>
      </Nav>
      <Stack isInline mb={3}>
        <Button onClick={toggleOrder}>{order ? 'ASC' : 'DESC'}</Button>
        <Button onClick={toggleOnlyTodo}>{onlyTodo ? 'Only Todo' : 'All'}</Button>
        <Button onClick={toggleMass}>{mass ? 'Close mass' : 'Select mass'}</Button>
        <Button onClick={toggleButtons}>{hideButtons ? 'Show buttons' : 'Hide buttons'}</Button>
      </Stack>
      {mass && (
        <Stack spacing={2} mb={3}>
          <Box>Selected: {numberOfSelected}</Box>
          <SimpleGrid columns={[2, null, 4]} spacingX="20px" spacingY="10px">
            <Button onClick={selectAll} variantColor="yellow">
              Select all
            </Button>
            <Button onClick={bulkDelete} variantColor="red" isDisabled={numberOfSelected === 0}>
              Bulk delete
            </Button>
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
      <Collapse isOpen={showNew}>
        <TodoForm close={toggleNew} ref={newRef} />
      </Collapse>
      {filteredData.length > 0 ? (
        <Stack spacing={4} shouldWrapChildren>
          {filteredData
            .filter((todo) => (onlyTodo ? !todo.checked : true))
            .map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                saveList={saveList}
                check={check}
                remove={remove}
                lists={lLoading || lError || !lData ? [] : lData.lists}
                mass={mass}
                massSelect={massSelected[todo.id]}
                massClick={massClick}
                hideButtons={hideButtons}
              />
            ))}
        </Stack>
      ) : (
        <Heading fontSize={1.75}>No data :(</Heading>
      )}
    </Box>
  );
};

export default Home;
