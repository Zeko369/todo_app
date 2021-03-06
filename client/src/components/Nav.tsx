import React from 'react';
import { useRouter } from 'next/router';
import {
  Flex,
  Heading,
  Grid,
  useColorMode,
  Box,
  Avatar,
  Menu,
  MenuButton,
  Text,
  MenuItem,
  MenuList,
  HStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
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
      <HStack align="center" spacing={3}>
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
      </HStack>
      <Flex w="100%" justify="flex-end">
        <HStack align="center">
          {children}
          {me && (
            <Box>
              <Menu>
                <MenuButton>
                  <Avatar name={me.username} />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={toggleColorMode}>
                    <HStack align="center">
                      {dark ? <MoonIcon /> : <SunIcon />}
                      <Text>{dark ? 'Dark' : 'Light'} theme</Text>
                    </HStack>
                  </MenuItem>
                  <MenuItem>Profile (not working)</MenuItem>
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Box>
          )}
        </HStack>
      </Flex>
    </Grid>
  );
};

export default Nav;
