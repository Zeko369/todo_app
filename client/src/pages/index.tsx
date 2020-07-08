import React, { Suspense, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { NextPage } from 'next';
import useSWR from 'swr';
import { Stack, Box, Heading, Button, Flex, Text } from '@chakra-ui/core';

import config from '../config';
import { ITodo } from '../ts/api';
import useSaveToggle from '../hooks/useSaveToggle';
import Todo from '../components/Todo';
import useToggle from '../hooks/useToggle';
import TodoForm from '../components/TodoForm';
import { IMutate } from '../ts/swr';

const isServer = typeof window === 'undefined';

interface TodosProps {
  lin: boolean;
  order: boolean;
  onlyTodo: boolean;
  setStats: React.Dispatch<React.SetStateAction<string>>;
}

const Todos: React.FC<TodosProps> = ({ lin, order, onlyTodo, setStats }) => {
  const { data, mutate } = useSWR<ITodo[]>(config.apiUrl('/todos'));

  const check = async (id: number): Promise<unknown> => {
    try {
      const res = await fetch(config.apiUrl(`/todos/${id}/check`), { method: 'PATCH' });
      const data = await res.json();
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
      const res = await fetch(config.apiUrl(`/todos/${id}`), { method: 'DELETE' });
      if (res.status === 204) {
        return await mutate((current) => current.filter((todo) => todo.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredData = (data || [])
    .filter((todo) => (lin ? todo.id >= 115 : true))
    .sort((t1, t2) => (order ? t1.id - t2.id : t2.id - t1.id));

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

  const [lin, toggle] = useSaveToggle('lin');
  const [order, toggleOrder] = useSaveToggle('order');
  const [onlyTodo, toggleOnlyTodo] = useSaveToggle('onlyTodo');
  const [showNew, toggleNew] = useToggle(true);

  return (
    <Box w="90%" maxW="1000px" m="0 auto">
      <Flex justify="space-between" align="center">
        <Stack isInline align="center">
          <Heading mb={3}>Todos</Heading>
          <Button onClick={toggle}>{lin ? 'Only lin' : 'All'}</Button>
          <Button onClick={toggleOrder}>{order ? 'ASC' : 'DESC'}</Button>
          <Button onClick={toggleOnlyTodo}>{onlyTodo ? 'Only Todo' : 'All'}</Button>
        </Stack>
        <Stack isInline align="center">
          <Text>{stats}</Text>
          <Button onClick={toggleNew} variantColor="blue">
            {showNew ? 'Hide new' : 'Show new'}
          </Button>
        </Stack>
      </Flex>
      {showNew && <TodoForm type="new" />}
      {!isServer && (
        <Suspense fallback={<Heading>Loading...</Heading>}>
          <Todos lin={lin} order={order} onlyTodo={onlyTodo} setStats={setStats} />
        </Suspense>
      )}
    </Box>
  );
};

export default Home;
