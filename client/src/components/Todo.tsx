import React, { useState } from 'react';
import { Box, Flex, IconButton, Heading, Text } from '@chakra-ui/core';
import { ITodo } from '../ts/api';
import styled from '@emotion/styled';

interface TodoProps {
  todo: ITodo;
  check: (id: number) => Promise<unknown>;
  remove: (id: number) => Promise<unknown>;
}

const CustomBox = styled(Box)`
  .remove {
    opacity: 0;
    transition-duration: 0.2s;
  }

  &:hover {
    .remove {
      opacity: 1;
    }
  }
`;

const Todo: React.FC<TodoProps> = ({ todo, check, remove }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { id, title, description, checked } = todo;

  const onCheck = () => {
    setLoading(true);
    check(id).finally(() => setLoading(false));
  };

  const onDelete = () => {
    setLoading(true);
    remove(id).finally(() => setLoading(false));
  };

  return (
    <CustomBox p={4} shadow="md" borderWidth="1px">
      <Flex align="center" justify="space-between">
        <Flex>
          <IconButton
            icon={checked ? 'check-circle' : 'check'}
            variantColor={checked ? 'green' : 'blue'}
            aria-label="check"
            mr={4}
            isLoading={loading}
            onClick={onCheck}
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
        <Box className="remove">
          <IconButton
            icon="delete"
            variantColor="red"
            aria-label="Delete"
            isLoading={loading}
            onClick={onDelete}
          />
        </Box>
      </Flex>
    </CustomBox>
  );
};

export default Todo;
