import { Box, Heading, IconButton, useColorMode } from '@chakra-ui/core';
import React from 'react';

export const AuthLayout: React.FC = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const light = colorMode === 'light';

  return (
    <Box h="100vh" w="100wv" bg={light ? 'blue.300' : 'blue.600'}>
      <IconButton
        mr="2"
        mt="2"
        float="right"
        icon={colorMode === 'dark' ? 'moon' : 'sun'}
        aria-label={colorMode === 'dark' ? 'light' : 'dark'}
        onClick={toggleColorMode}
      />
      <Box
        pos="absolute"
        top="30vh"
        left="50%"
        w="80%"
        maxW="350px"
        transform="translate(-50%, max(-50%, -20vh))"
      >
        <Heading mb="4">Todo app</Heading>
        <Box borderWidth="1px" rounded="lg" p="5" bg={light ? 'white' : 'gray.800'}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};
