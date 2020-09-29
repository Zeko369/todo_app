import React from 'react';
import { useRouter } from 'next/router';
import {
  Flex,
  Stack,
  Heading,
  Text,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Grid,
} from '@chakra-ui/core';
import Link from 'next/link';
import { useMeQuery } from '../generated/graphql';

interface INavProps {}

const Nav: React.FC<INavProps> = ({ children }) => {
  const { loading, error, data } = useMeQuery();
  const router = useRouter();

  const me = (!loading && !error && data?.me) || null;

  const lists = router.asPath.startsWith('/list');
  const notes = router.asPath.startsWith('/notes');
  const tags = router.asPath.startsWith('/tags');

  const logout = () => {
    localStorage.removeItem('token');
    router.push('/auth/login');
  };

  return (
    <Grid
      templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
      gap="1"
      alignItems="center"
    >
      <Stack isInline align="center" spacing={3}>
        <Heading mb={3} style={{ color: !(lists || notes || tags) ? '#000' : '#888' }}>
          <Link href="/">Todos</Link>
        </Heading>
        <Heading mb={3} style={{ color: notes ? '#000' : '#888' }}>
          <Link href="/notes">Notes</Link>
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
      <Flex w="100%" justify="space-between">
        {me && (
          <Flex alignItems="center">
            <Stack isInline>
              <Text>Hello, </Text>
              <Text fontWeight="bold">{me.username}</Text>
              <Popover>
                <PopoverTrigger>
                  <Button size="xs" variantColor="red" variant="ghost">
                    Logout
                  </Button>
                </PopoverTrigger>
                <PopoverContent zIndex={4}>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>Are you sure you want to logout?</PopoverHeader>
                  <PopoverBody display="flex" justifyContent="center">
                    <Button variantColor="red" onClick={logout}>
                      Log out
                    </Button>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Stack>
          </Flex>
        )}
        <Stack isInline align="center">
          {children}
        </Stack>
      </Flex>
    </Grid>
  );
};

export default Nav;
