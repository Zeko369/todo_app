import React from 'react';
import { NextPage } from 'next';
import { useListsQuery } from '../../generated/graphql';
import { Heading, List, Spinner, ListItem } from '@chakra-ui/core';
import Link from '../../components/Link';

const Lists: NextPage = () => {
  const { loading, error, data } = useListsQuery();

  return (
    <>
      <Heading>Lists</Heading>
      {loading ? (
        <Spinner />
      ) : error || !data ? (
        <Heading size="xl">Error :(</Heading>
      ) : (
        <List styleType="disc">
          {data.lists.map((list) => (
            <ListItem key={list.id}>
              <Link href="/lists/[id]" as={`/lists/${list.id}`}>
                {list.title}
              </Link>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};

export default Lists;
