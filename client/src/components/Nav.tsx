import React from 'react';
import { useRouter } from 'next/router';
import { Flex, Stack, Heading } from '@chakra-ui/core';
import Link from './Link';

interface INavProps {}

const Nav: React.FC<INavProps> = ({ children }) => {
  const router = useRouter();

  console.log(router.asPath.startsWith('/lists'));

  return (
    <Flex justify="space-between" align="center">
      <Stack isInline align="center" spacing={3}>
        <Heading mb={3}>
          <Link href="/">Todos</Link>
        </Heading>
        <Heading mb={3}>
          <Link href="/lists">Lists</Link>
        </Heading>
      </Stack>
      <Stack isInline align="center">
        {children}
      </Stack>
    </Flex>
  );
};

export default Nav;
