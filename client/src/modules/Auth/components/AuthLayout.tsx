import { Box, Heading } from '@chakra-ui/core';
import React from 'react';
import { Card } from './Card';

export const AuthLayout: React.FC = ({ children }) => {
  return (
    <Box h="100vh" w="100wv" bg="blue.300">
      <Box
        pos="absolute"
        top="30vh"
        left="50%"
        w="80%"
        maxW="350px"
        transform="translate(-50%, max(-50%, -20vh))"
      >
        <Heading mb="4">Todo app</Heading>
        <Card>{children}</Card>
      </Box>
    </Box>
  );
};
