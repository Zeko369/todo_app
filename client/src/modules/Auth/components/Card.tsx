import React from 'react';
import { Box } from '@chakra-ui/core';

export const Card: React.FC = ({ children }) => {
  return (
    <Box h="100vh" w="100wv" bg="blue.300">
      <Box
        pos="absolute"
        top="30vh"
        left="50%"
        w="80%"
        maxW="350px"
        transform="translate(-50%, max(-50%, -20vh))"
        borderWidth="1px"
        rounded="lg"
        p="5"
        bg="white"
      >
        {children}
      </Box>
    </Box>
  );
};
