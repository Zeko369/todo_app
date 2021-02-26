import React from 'react';
import { NextPage } from 'next';
import { Box, Spinner, Heading, List, ListItem } from '@chakra-ui/react';
import { Link, LinkButton } from 'chakra-next-link';

import Nav from '../../../components/Nav';
import { useNotesQuery } from '../../../generated/graphql';

export const NotesPage: NextPage = () => {
  const { loading, error, data } = useNotesQuery();

  return (
    <Box w="90%" maxW="1000px" m="0 auto">
      <Nav>
        <LinkButton href="/notes/new">New</LinkButton>
      </Nav>
      {loading ? (
        <Spinner />
      ) : error || !data ? (
        <Heading size="xl">Error :(</Heading>
      ) : (
        <List styleType="disc">
          {data.todos.map((note) => (
            <ListItem>
              <Link href={`/notes/${note.id}`}>{note.title}</Link>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};
