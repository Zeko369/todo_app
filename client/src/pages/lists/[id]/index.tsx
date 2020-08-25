import React from 'react';
import { NextPage } from 'next';
import { List, Heading, Spinner, ListItem, Box } from '@chakra-ui/core';
import { useRouter } from 'next/router';

import { useListQuery } from '../../../generated/graphql';
import { getId } from '../../../helpers/getId';
import Nav from '../../../components/Nav';

const ListPage: NextPage = () => {
  const router = useRouter();
  const id = getId(router.query) || -1;
  const { loading, error, data } = useListQuery({ variables: { id } });

  return (
    <Box w="90%" maxW="1000px" m="0 auto">
      <Nav />
      <Heading>List: {data?.list?.title}</Heading>
      {loading ? (
        <Spinner />
      ) : error || !data ? (
        <Heading size="xl">Error :(</Heading>
      ) : (
        <List styleType="disc">
          {data.list?.todos.map((todo) => (
            <ListItem key={todo.id}>{todo.title}</ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default ListPage;
