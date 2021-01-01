import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Box, Heading, Spinner, Flex } from '@chakra-ui/core';
import { LinkButton } from 'chakra-next-link';
import hydrate from 'next-mdx-remote/hydrate';
import styled from '@emotion/styled';

import { getId } from '../../../helpers/getId';
import { useNoteQuery } from '../../../generated/graphql';
import Nav from '../../../components/Nav';
import { AuthWrapper } from '../../Auth/shared/AuthWrapper';
import { components } from '../../../components/md';

const PostContentWrapper = styled(Box)`
  & > :not(.remark-code-title) {
    margin-bottom: 10px;
  }
`;

const initContent = {
  compiledSource: 'const MDXContent = () => null;',
  renderedOutput: '',
  scope: {},
};

export const NotePage: NextPage = () => {
  const router = useRouter();
  const id = getId(router.query) || -1;

  const [content, setContent] = useState<string>();
  const { loading, error, data } = useNoteQuery({ variables: { id } });

  useEffect(() => {
    if (!loading && !error && data) {
      fetch(`/api/render`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ source: data.todo?.description }),
      })
        .then((res) => res.json())
        .then((out) => {
          setContent(out.mdxSource);
        });
    }
  }, [loading, error, data]);

  const mdxDone = hydrate(content || initContent, { components });

  // TODO: MOVE THIS INTO LAYOUT
  return (
    <AuthWrapper>
      <Box w="90%" maxW="1000px" m="0 auto">
        <Nav />
        <Flex justify="space-between">
          <Heading>{data?.todo?.title}</Heading>
          <LinkButton href="/notes/[id]/edit" nextAs={`/notes/${id}/edit`} variantColor="green">
            Edit
          </LinkButton>
        </Flex>
        {loading ? (
          <Spinner />
        ) : error || !data || !data.todo ? (
          <Heading size="xl">Error :(</Heading>
        ) : true ? (
          <PostContentWrapper>{mdxDone}</PostContentWrapper>
        ) : (
          <Spinner />
        )}
      </Box>
    </AuthWrapper>
  );
};
