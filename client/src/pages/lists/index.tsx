import React from 'react';
import { NextPage } from 'next';
import { useListsQuery } from '../../generated/graphql';
import { Heading, List, Spinner, ListItem, Box, Button } from '@chakra-ui/core';
import Link, { LinkButton } from '../../components/Link';
import Nav from '../../components/Nav';

const Lists: NextPage = () => {
  const { loading, error, data } = useListsQuery();

  return (
    <Box w="90%" maxW="1000px" m="0 auto">
      <Nav>
        <LinkButton href="/lists/new" variantColor="blue">
          New
        </LinkButton>
      </Nav>
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
    </Box>
  );
};

export default Lists;
