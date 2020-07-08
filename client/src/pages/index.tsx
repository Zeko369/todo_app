import React, { Suspense } from 'react';
import { NextPage } from 'next';
import useSWR from 'swr';
import config from '../config';
import { ITodo } from '../ts/api';
import { Stack, Text, Box, Heading, Flex, IconButton } from '@chakra-ui/core';

const isServer = typeof window === 'undefined';

interface TodoProps {
  todo: ITodo;
  check: (id: number) => () => void;
}

const Todo: React.FC<TodoProps> = ({ todo, check }) => {
  const { id, title, description, checked } = todo;

  return (
    <Box p={5} shadow="md" borderWidth="1px">
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
          {description && <Text mt={4}>{description}</Text>}
        </Box>
      </Flex>
    </Box>
  );
};

const Todos: React.FC = () => {
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
    <Stack spacing={8} shouldWrapChildren>
      {data.map((todo) => (
        <Todo todo={todo} check={check} />
      ))}
    </Stack>
  ) : (
    <Heading fontSize={1.75}>No data :(</Heading>
  );
};

const Home: NextPage = () => {
  return (
    <Box w="90%" maxW="1000px" m="0 auto">
      <Heading mb={3}>Todos</Heading>
      {!isServer && (
        <Suspense fallback={<Heading>Loading...</Heading>}>
          <Todos />
        </Suspense>
      )}
    </Box>
  );
};

export default Home;
