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
  useColorMode,
  IconButton,
} from '@chakra-ui/core';
import Link from 'next/link';
import { useMeQuery } from '../generated/graphql';

interface INavProps {}

const Nav: React.FC<INavProps> = ({ children }) => {
  const { loading, error, data } = useMeQuery();
  const router = useRouter();

  const me = (!loading && !error && data?.me) || null;

  const { colorMode, toggleColorMode } = useColorMode();

  const textColor = {
    dark: (selected: boolean) => (selected ? '#fff' : '#888'),
    light: (selected: boolean) => (selected ? '#000' : '#888'),
  };

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
        <Heading mb={3} style={{ color: textColor[colorMode](!(lists || notes || tags)) }}>
          <Link href="/">Todos</Link>
        </Heading>
        <Heading mb={3} style={{ color: textColor[colorMode](notes) }}>
          <Link href="/notes">Notes</Link>
        </Heading>
        <Heading mb={3} style={{ color: textColor[colorMode](lists) }}>
          <Link href="/lists">
            <a>Lists</a>
          </Link>
        </Heading>
        <Heading mb={3} style={{ color: textColor[colorMode](tags) }}>
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
          <IconButton
            icon={colorMode === 'dark' ? 'moon' : 'sun'}
            aria-label={colorMode === 'dark' ? 'light' : 'dark'}
            onClick={toggleColorMode}
          />
        </Stack>
      </Flex>
    </Grid>
  );
};

export default Nav;
