import React from 'react';
import { NextPage } from 'next';
import {
  Heading,
  Spinner,
  Box,
  Tag,
  Flex,
  TagLabel,
  Checkbox,
  Stack,
  Text,
  Button,
} from '@chakra-ui/core';
import { useRouter } from 'next/router';

import { useListQuery, useCheckTodoMutation } from '../../../generated/graphql';
import { getId } from '../../../helpers/getId';
import Nav from '../../../components/Nav';
import { TODOS_QUERY } from '../../../graphql/queries';
import useSaveToggle from '../../../hooks/useSaveToggle';

const ListPage: NextPage = () => {
  const router = useRouter();
  const id = getId(router.query) || -1;

  const { loading, error, data } = useListQuery({ variables: { id } });
  const [checkTodo] = useCheckTodoMutation({
    refetchQueries: [{ query: TODOS_QUERY }],
  });

  const [showAll, toggleAll] = useSaveToggle('lists:all');

  const check = (id: number) => async () => {
    await checkTodo({ variables: { id } });
  };

  return (
    <Box w="90%" maxW="1000px" m="0 auto">
      <Nav />
      <Stack spacing={3} isInline>
        <Heading>List: {data?.list?.title}</Heading>
        <Button onClick={toggleAll}>{!showAll ? 'Only todo' : 'All'}</Button>
      </Stack>
      {loading ? (
        <Spinner />
      ) : error || !data ? (
        <Heading size="xl">Error :(</Heading>
      ) : (
        <Stack>
          {data.list?.todos
            .filter((todo) => showAll || !todo.checked)
            .map((todo) => (
              <Stack key={todo.id} isInline spacing={3} alignItems="center">
                <Checkbox isChecked={todo.checked} onChange={check(todo.id)} />
                <Text textDecoration={todo.checked ? 'line-through' : ''}>{todo.title}</Text>
                {todo.tags.map((tag) => (
                  <Tag key={tag.id} mb={2}>
                    <Flex alignItems="center">
                      <TagLabel>{tag.text}</TagLabel>
                    </Flex>
                  </Tag>
                ))}
              </Stack>
            ))}
        </Stack>
      )}
    </Box>
  );
};

export default ListPage;
