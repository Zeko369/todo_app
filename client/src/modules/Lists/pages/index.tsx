import React from 'react';
import { NextPage } from 'next';
import { Heading, List, Spinner, ListItem, Box } from '@chakra-ui/core';
import { Link, LinkButton } from 'chakra-next-link';

import { useListsQuery } from '../../../generated/graphql';
import Nav from '../../../components/Nav';

export const ListsPage: NextPage = () => {
  const { loading, error, data } = useListsQuery();

  return (
    <Box w="90%" maxW="1000px" m="0 auto">
      <Nav>
        <LinkButton href="/lists/new" variantColor="blue">
          New
        </LinkButton>
      </Nav>
      {loading ? (
        <Spinner />
      ) : error || !data ? (
        <Heading size="xl">Error :(</Heading>
      ) : (
        <List styleType="disc">
          {data.lists.map((list) => (
            <ListItem key={list.id}>
              <Link href="/lists/[id]" nextAs={`/lists/${list.id}`}>
                {list.title}
              </Link>
              {'  '}
              <Link href="/lists/[id]/edit" nextAs={`/lists/${list.id}/edit`}>
                Edit
              </Link>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};
