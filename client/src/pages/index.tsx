import React, { Suspense, useState, useEffect, useRef, useCallback } from 'react';
import { NextPage } from 'next';
import useSWR from 'swr';
import { Stack, Box, Heading, Button, Flex, Text, Collapse } from '@chakra-ui/core';

import config from '../config';
import { ITodo } from '../ts/api';
import useSaveToggle from '../hooks/useSaveToggle';
import Todo from '../components/Todo';
import useToggle from '../hooks/useToggle';
import TodoForm from '../components/TodoForm';
import http from '../api/http';
import useKeyPress from '../hooks/useKeyPress';

const isServer = typeof window === 'undefined';

interface TodosProps {
  order: boolean;
  onlyTodo: boolean;
  setStats: React.Dispatch<React.SetStateAction<string>>;
}

const Todos: React.FC<TodosProps> = ({ order, onlyTodo, setStats }) => {
  const { data, mutate } = useSWR<ITodo[]>(config.apiUrl('/todos'));

  const check = async (id: number): Promise<unknown> => {
    try {
      const data = await http.patch(config.apiUrl(`/todos/${id}/check`));
      return await mutate((current) => current.map((todo) => (todo.id === id ? data : todo)));
    } catch (err) {
      console.error(err);
    }
  };

  const remove = async (id: number): Promise<unknown> => {
    if (!confirm('Are you sure you want to delete this todo?')) {
      return;
    }

    try {
      const res = await http.delete(config.apiUrl(`/todos/${id}`));
      if (res.status === 204) {
        return await mutate((current) => current.filter((todo) => todo.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredData = (data || []).sort((t1, t2) => (order ? t1.id - t2.id : t2.id - t1.id));

  setStats(`${filteredData.filter((a) => !a.checked).length} / ${filteredData.length}`);

  return filteredData.length > 0 ? (
    <Stack spacing={4} shouldWrapChildren>
      {filteredData
        .filter((todo) => (onlyTodo ? !todo.checked : true))
        .map((todo) => (
          <Todo key={todo.id} todo={todo} check={check} remove={remove} />
        ))}
    </Stack>
  ) : (
    <Heading fontSize={1.75}>No data :(</Heading>
  );
};

const Home: NextPage = () => {
  const [stats, setStats] = useState<string>('');

  const [order, toggleOrder] = useSaveToggle('order');
  const [onlyTodo, toggleOnlyTodo] = useSaveToggle('onlyTodo');
  const [showNew, , setNew] = useToggle();

  const newRef = useRef<HTMLInputElement>(null);
  const newPressed = useKeyPress('n');

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

  useEffect(() => {
    if (newPressed) {
      openNew();
    }
  }, [newPressed]);

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
      {!isServer && (
        <Suspense fallback={<Heading>Loading...</Heading>}>
          <Todos order={order} onlyTodo={onlyTodo} setStats={setStats} />
        </Suspense>
      )}
    </Box>
  );
};

export default Home;
