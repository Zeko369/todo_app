import React from 'react';
import { NextPage } from 'next';
import { Heading, List, Spinner, ListItem, Box, Button } from '@chakra-ui/react';
import { Link, LinkButton } from 'chakra-next-link';

import Nav from '../../../components/Nav';
import { useListsQuery } from '../../Todos/hooks/useListsQuery';
import useSaveToggle from '../../../hooks/useSaveToggle';

export const ListsPage: NextPage = () => {
  const [showShared, toggle] = useSaveToggle('showShared', true);
  const { loading, error, data } = useListsQuery(showShared);

  return (
    <Box w="90%" maxW="1000px" m="0 auto">
      <Nav>
        <Button onClick={toggle}>{!showShared ? `Show` : 'Hide'} shared</Button>
        <LinkButton href="/lists/new" colorScheme="blue">
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
              <Link href={`/lists/${list.id}`}>{list.title}</Link>
              {'  '}
              <Link href={`/lists/${list.id}/edit`}>Edit</Link>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};
