import React from 'react';
import { NextPage } from 'next';
import { useListsQuery } from '../generated/graphql';
import { Heading, List, Spinner, ListItem } from '@chakra-ui/core';

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
            <ListItem key={list.id}>{list.title}</ListItem>
          ))}
        </List>
      )}
    </>
  );
};

export default Lists;
