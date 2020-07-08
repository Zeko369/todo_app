import React, { useState } from 'react';
import { Box, Flex, IconButton, Heading, Text } from '@chakra-ui/core';
import { ITodo } from '../ts/api';

interface TodoProps {
  todo: ITodo;
  check: (id: number) => Promise<unknown>;
}

const Todo: React.FC<TodoProps> = ({ todo, check }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { id, title, description, checked } = todo;

  const onClick = () => {
    setLoading(true);
    check(id).finally(() => setLoading(false));
  };

  return (
    <Box p={4} shadow="md" borderWidth="1px">
      <Flex align="center">
        <IconButton
          icon={checked ? 'check-circle' : 'check'}
          variantColor={checked ? 'green' : 'blue'}
          aria-label="check"
          mr={4}
          isLoading={loading}
          onClick={onClick}
        />
        <Box>
          <Heading fontSize="xl">{title}</Heading>
          {description && (
            <Text mt={4} wordBreak="break-all">
              {description}
            </Text>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Todo;
