import React from 'react';
import { Box } from '@chakra-ui/core';

export const Card: React.FC = ({ children }) => {
  return (
    <Box borderWidth="1px" rounded="lg" p="5" bg="white">
      {children}
    </Box>
  );
};
