import React from 'react';
import { useRouter } from 'next/router';
import {
  Flex,
  Stack,
  Heading,
  Grid,
  useColorMode,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuButton,
  Text,
  MenuItem,
  MenuList,
  Icon,
} from '@chakra-ui/core';
import Link from 'next/link';
import { useMeQuery } from '../generated/graphql';

interface INavProps {}

const Nav: React.FC<INavProps> = ({ children }) => {
  const { loading, error, data } = useMeQuery();
  const router = useRouter();

  const me = (!loading && !error && data?.me) || null;

  const { colorMode, toggleColorMode } = useColorMode();
  const dark = colorMode === 'dark';

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
      <Flex w="100%" justify="flex-end">
        <Stack isInline align="center">
          {children}
          {me && (
            <Box>
              <Menu>
                <MenuButton>
                  <Avatar name={me.username} />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={toggleColorMode}>
                    <Stack isInline align="center">
                      <Icon name={dark ? 'moon' : 'sun'} />
                      <Text>{dark ? 'Dark' : 'Light'} theme</Text>
                    </Stack>
                  </MenuItem>
                  <MenuItem>Profile (not working)</MenuItem>
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Box>
          )}
        </Stack>
      </Flex>
    </Grid>
  );
};

export default Nav;
