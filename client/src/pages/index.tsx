import React, { Suspense } from 'react';
import { NextPage } from 'next';
import useSWR from 'swr';
import { Stack, Box, Heading, Button } from '@chakra-ui/core';

import config from '../config';
import { ITodo } from '../ts/api';
import useSaveToggle from '../hooks/useSaveToggle';
import Todo from '../components/Todo';

const isServer = typeof window === 'undefined';

interface TodosProps {
  lin: boolean;
  order: boolean;
}

const Todos: React.FC<TodosProps> = ({ lin, order }) => {
  const { data, mutate } = useSWR<ITodo[]>(config.apiUrl('/todos'));

  const check = (id: number): Promise<void | ITodo[] | undefined> => {
    return fetch(config.apiUrl(`/todos/${id}/check`), { method: 'PATCH' })
      .then((res) => res.json())
      .then((data) => mutate((current) => current.map((todo) => (todo.id === id ? data : todo))))
      .catch((err) => console.error(err));
  };

  return data ? (
    <Stack spacing={4} shouldWrapChildren>
      {data
        .filter((todo) => (lin ? todo.id >= 115 : true))
        .sort((t1, t2) => (order ? t1.id - t2.id : t2.id - t1.id))
        .map((todo) => (
          <Todo key={todo.id} todo={todo} check={check} />
        ))}
    </Stack>
  ) : (
    <Heading fontSize={1.75}>No data :(</Heading>
  );
};

const Home: NextPage = () => {
  const [lin, toggle] = useSaveToggle('lin');
  const [order, toggleOrder] = useSaveToggle('order');

  return (
    <Box w="90%" maxW="1000px" m="0 auto">
      <Stack isInline align="center">
        <Heading mb={3}>Todos</Heading>
        <Button onClick={toggle}>{lin ? 'Only lin' : 'All'}</Button>
        <Button onClick={toggleOrder}>{order ? 'ASC' : 'DESC'}</Button>
      </Stack>
      {!isServer && (
        <Suspense fallback={<Heading>Loading...</Heading>}>
          <Todos lin={lin} order={order} />
        </Suspense>
      )}
    </Box>
  );
};

export default Home;
