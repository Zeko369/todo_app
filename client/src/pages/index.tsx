import React, { Suspense } from 'react';
import { NextPage } from 'next';
import useSWR from 'swr';
import config from '../config';
import { ITodo } from '../ts/api';
import { Stack, Text, Box, Heading, Flex, IconButton, Button } from '@chakra-ui/core';
import useSaveToggle from '../hooks/useSaveToggle';

const isServer = typeof window === 'undefined';

interface TodoProps {
  todo: ITodo;
  check: (id: number) => () => void;
}

const Todo: React.FC<TodoProps> = ({ todo, check }) => {
  const { id, title, description, checked } = todo;

  return (
    <Box p={4} shadow="md" borderWidth="1px">
      <Flex align="center">
        <IconButton
          icon={checked ? 'check-circle' : 'check'}
          variantColor={checked ? 'green' : 'blue'}
          aria-label="check"
          mr={4}
          onClick={check(id)}
        />
        <Box>
          <Heading fontSize="xl">{title}</Heading>
          {description && (
            <Text mt={4} wordBreak="break-all">
              {description}
            </Text>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

interface TodosProps {
  lin: boolean;
}

const Todos: React.FC<TodosProps> = ({ lin }) => {
  const { data, mutate } = useSWR<ITodo[]>(config.apiUrl('/todos'));

  const check = (id: number) => () => {
    fetch(config.apiUrl(`/todos/${id}/check`), { method: 'PATCH' })
      .then((res) => res.json())
      .then((data) => {
        mutate((current) => current.map((todo) => (todo.id === id ? data : todo)));
      })
      .catch((err) => console.error(err));
  };

  return data ? (
    <Stack spacing={4} shouldWrapChildren>
      {data
        .filter((todo) => (lin ? todo.id >= 115 : true))
        .map((todo) => (
          <Todo todo={todo} check={check} />
        ))}
    </Stack>
  ) : (
    <Heading fontSize={1.75}>No data :(</Heading>
  );
};

const Home: NextPage = () => {
  const [lin, toggle] = useSaveToggle();

  return (
    <Box w="90%" maxW="1000px" m="0 auto">
      <Stack isInline align="center">
        <Heading mb={3}>Todos</Heading>
        <Button onClick={toggle}>{lin ? 'Only lin' : 'All'}</Button>
      </Stack>
      {!isServer && (
        <Suspense fallback={<Heading>Loading...</Heading>}>
          <Todos lin={lin} />
        </Suspense>
      )}
    </Box>
  );
};

export default Home;
