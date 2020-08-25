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
      <Link href="/lists/new">New</Link>
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
              {'  '}
              <Link href="/lists/[id]/edit" as={`/lists/${list.id}/edit`}>
                Edit
              </Link>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};

export default Lists;
