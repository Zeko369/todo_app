import React, { useState } from 'react';
import { Box, Flex, IconButton, Heading, Text, Stack } from '@chakra-ui/core';
import { ITodo } from '../ts/api';
import styled from '@emotion/styled';
import useToggle from '../hooks/useToggle';
import TodoForm from './TodoForm';

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
  const [showUpdate, toggleUpdate, setUpdate] = useToggle();
  const { id, title, description, checked } = todo;

  const onCheck = () => {
    setLoading(true);
    check(id).finally(() => setLoading(false));
  };

  const onDelete = () => {
    setLoading(true);
    remove(id).finally(() => setLoading(false));
  };

  return showUpdate ? (
    <TodoForm todo={todo} close={() => setUpdate(false)} />
  ) : (
    <CustomBox p={4} shadow="md" borderWidth="1px">
      <Flex align="center" justify="space-between">
        <Flex>
          <IconButton
            icon={checked ? 'check' : 'minus'}
            variantColor={checked ? 'green' : 'gray'}
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
        <Stack className="remove" spacing={3} isInline>
          <IconButton
            icon="delete"
            variantColor="red"
            aria-label="Delete"
            isLoading={loading}
            onClick={onDelete}
          />
          <IconButton
            icon="edit"
            variantColor="green"
            aria-label="Update"
            isLoading={loading}
            onClick={toggleUpdate}
          />
        </Stack>
      </Flex>
    </CustomBox>
  );
};

export default Todo;
