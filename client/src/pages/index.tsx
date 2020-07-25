import React, { useState, useRef, useCallback, useEffect } from 'react';
import { NextPage } from 'next';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Stack, Box, Heading, Button, Flex, Text, Collapse } from '@chakra-ui/core';

import useSaveToggle from '../hooks/useSaveToggle';
import Todo from '../components/Todo';
import useToggle from '../hooks/useToggle';
import TodoForm from '../components/TodoForm';
import useKeyPress from '../hooks/useKeyPress';

export const TODOS_QUERY = gql`
  query Todos {
    todos(orderBy: { id: desc }) {
      id
      title
      description
      checked
    }
  }
`;

export interface ITodo {
  id: number;
  title: string;
  description: string | null;
  checked: boolean;
}

interface TodosProps {
  order: boolean;
  onlyTodo: boolean;
  setStats: React.Dispatch<React.SetStateAction<string>>;
}

const CHECK_MUTATION = gql`
  mutation checkTodo($id: Int!) {
    checkTodo(id: $id) {
      id
      checked
    }
  }
`;

const DELETE_MUTATION = gql`
  mutation deleteTodo($id: Int!) {
    deleteOneTodo(where: { id: $id }) {
      id
    }
  }
`;

const Home: NextPage = () => {
  const { loading, error, data } = useQuery<{ todos: ITodo[] }>(TODOS_QUERY);

  const [stats, setStats] = useState<string>('');

  const [order, toggleOrder] = useSaveToggle('order');
  const [onlyTodo, toggleOnlyTodo] = useSaveToggle('onlyTodo');
  const [showNew, , setNew] = useToggle();

  const [checkTodo] = useMutation<{ id: number }>(CHECK_MUTATION, {
    refetchQueries: [{ query: TODOS_QUERY }],
  });
  const [removeTodo] = useMutation<{ id: number }>(DELETE_MUTATION, {
    refetchQueries: [{ query: TODOS_QUERY }],
  });

  const check = (id: number): any => checkTodo({ variables: { id } });
  const remove = (id: number): any => {
    if (confirm('Are you sure?')) {
      return removeTodo({ variables: { id } });
    }
  };

  const newRef = useRef<HTMLInputElement>(null);
  useKeyPress('n', (down) => {
    if (down) {
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
              <Todo key={todo.id} todo={todo} check={check} remove={remove} />
            ))}
        </Stack>
      ) : (
        <Heading fontSize={1.75}>No data :(</Heading>
      )}
    </Box>
  );
};

export default Home;
