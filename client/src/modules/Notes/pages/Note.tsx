import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { getId } from '../../../helpers/getId';
import { useNoteQuery } from '../../../generated/graphql';
import { Box, Text, Heading, Spinner, Stack } from '@chakra-ui/core';
import { LinkButton } from 'chakra-next-link';
import Nav from '../../../components/Nav';

export const NotePage: NextPage = () => {
  const router = useRouter();
  const id = getId(router.query) || -1;

  const { loading, error, data } = useNoteQuery({ variables: { id } });

  return (
    <Box w="90%" maxW="1000px" m="0 auto">
      <Nav />
      <Stack spacing={3} isInline>
        <Heading>List: {data?.todo?.title}</Heading>
        <LinkButton href="/notes/[id]/edit" nextAs={`/notes/${id}/edit`} variantColor="green">
          Edit
        </LinkButton>
      </Stack>
      {loading ? (
        <Spinner />
      ) : error || !data || !data.todo ? (
        <Heading size="xl">Error :(</Heading>
      ) : (
        <>
          <Text mt="2">{data.todo.description}</Text>
        </>
      )}
    </Box>
  );
};
