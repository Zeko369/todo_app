import React, { useState, useRef, useCallback, useEffect } from 'react';
import { NextPage } from 'next';
import { Stack, Box, Heading, Button, Flex, Text, Collapse } from '@chakra-ui/core';

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
} from '../generated/graphql';
import { TODOS_QUERY } from '../graphql/queries';

const Home: NextPage = () => {
  const { loading, error, data } = useTodosQuery();
  const { loading: lLoading, error: lError, data: lData } = useListsQuery();

  const [stats, setStats] = useState<string>('');

  const [order, toggleOrder] = useSaveToggle('order');
  const [onlyTodo, toggleOnlyTodo] = useSaveToggle('onlyTodo');
  const [showNew, , setNew] = useToggle();

  const [checkTodo] = useCheckTodoMutation({ refetchQueries: [{ query: TODOS_QUERY }] });
  const [deleteTodo] = useDeleteTodoMutation({ refetchQueries: [{ query: TODOS_QUERY }] });
  const [updateTodo] = useUpdateTodoMutation({ refetchQueries: [{ query: TODOS_QUERY }] });
  const [removeTodoFromList] = useRemoveTodoFromListMutation({
    refetchQueries: [{ query: TODOS_QUERY }],
  });

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

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error...</h1>;

  return (
    <Box w="90%" maxW="1000px" m="0 auto">
      <Flex justify="space-between" align="center">
        <Stack isInline align="center">
          <Heading mb={3}>Todos</Heading>
        </Stack>
        <Stack isInline align="center">
          <Text>{stats}</Text>
          <Button onClick={toggleNew} variantColor="blue">
            {showNew ? 'Hide new' : 'Show new'}
          </Button>
        </Stack>
      </Flex>
      <Stack isInline mb={3}>
        <Button onClick={toggleOrder}>{order ? 'ASC' : 'DESC'}</Button>
        <Button onClick={toggleOnlyTodo}>{onlyTodo ? 'Only Todo' : 'All'}</Button>
      </Stack>
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
