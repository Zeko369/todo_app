import React from 'react';
import { useRouter } from 'next/router';
import { Flex, Stack, Heading } from '@chakra-ui/core';
import Link from 'next/link';

interface INavProps {}

const Nav: React.FC<INavProps> = ({ children }) => {
  const router = useRouter();

  const lists = router.asPath.startsWith('/list');
  const tags = router.asPath.startsWith('/tags');

  return (
    <Flex justify="space-between" align="center">
      <Stack isInline align="center" spacing={3}>
        <Heading mb={3} style={{ color: !(lists || tags) ? '#000' : '#888' }}>
          <Link href="/">Todos</Link>
        </Heading>
        <Heading mb={3} style={{ color: lists ? '#000' : '#888' }}>
          <Link href="/lists">
            <a>Lists</a>
          </Link>
        </Heading>
        <Heading mb={3} style={{ color: tags ? '#000' : '#888' }}>
          <Link href="/tags">
            <a>Tags</a>
          </Link>
        </Heading>
      </Stack>
      <Stack isInline align="center">
        {children}
      </Stack>
    </Flex>
  );
};

export default Nav;
