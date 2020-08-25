import React from 'react';
import { NextPage } from 'next';
import { List, Heading, Spinner, ListItem } from '@chakra-ui/core';
import { useRouter } from 'next/router';

import { useListQuery } from '../../../generated/graphql';
import { getId } from '../../../helpers/getId';
import Link from '../../../components/Link';

const ListPage: NextPage = () => {
  const router = useRouter();
  const id = getId(router.query) || -1;
  const { loading, error, data } = useListQuery({ variables: { id } });

  return (
    <>
      <Heading>List: {data?.list?.title}</Heading>
      <Link href="/lists">Go back</Link>
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
    </>
  );
};

export default ListPage;
