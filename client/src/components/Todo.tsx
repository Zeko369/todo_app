import React, { useState, useEffect } from 'react';
import { Box, Flex, IconButton, Heading, Text, Stack, Select, Button } from '@chakra-ui/core';

import useToggle from '../hooks/useToggle';
import TodoForm from './TodoForm';
import { Todo as TodoDB, List as ListDB } from '../generated/graphql';

interface TodoProps {
  mass: boolean;
  massSelect: boolean;
  massClick: (id: number) => void;
  lists: Pick<ListDB, 'id' | 'title'>[];
  todo: Pick<TodoDB, 'id' | 'title' | 'description' | 'checked'> & {
    list?: Pick<ListDB, 'id'> | null;
  };
  check: (id: number) => Promise<unknown>;
  remove: (id: number) => Promise<unknown>;
  saveList: (id: number, listId: number) => Promise<unknown>;
}

const Todo: React.FC<TodoProps> = ({
  todo,
  check,
  remove,
  saveList,
  lists,
  mass,
  massSelect,
  massClick,
}) => {
  const { id, title, description, checked, list } = todo;

  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<number>(list?.id || -1);
  const [showUpdate, toggleUpdate, setUpdate] = useToggle();

  useEffect(() => {
    if (selected !== list?.id) {
      setSelected(list?.id || -1);
    }
  }, [list?.id]);

  const changeList = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(parseInt(e.target.value));
  };

  const onCheck = () => {
    setLoading(true);
    check(id).finally(() => setLoading(false));
  };

  const onDelete = () => {
    setLoading(true);
    remove(id).finally(() => setLoading(false));
  };

  const onSaveList = () => {
    setLoading(true);
    saveList(id, selected).finally(() => setLoading(false));
  };

  const onMass = () => {
    massClick(id);
  };

  return showUpdate ? (
    <TodoForm todo={todo} close={() => setUpdate(false)} />
  ) : (
    <Box p={4} shadow="md" borderWidth="1px">
      <Flex align="center" justify="space-between" pos="relative">
        <Flex>
          <IconButton
            icon={(mass ? massSelect : checked) ? 'check' : 'minus'}
            variantColor={(mass ? massSelect : checked) ? (mass ? 'blue' : 'green') : 'gray'}
            aria-label="check"
            mr={4}
            isLoading={loading}
            onClick={mass ? onMass : onCheck}
          />
          <Box>
            <Heading fontSize="xl" wordBreak="break-all">
              <Text>[{id}]</Text> {title}
            </Heading>
            {description && (
              <Text mt={4} wordBreak="break-all">
                {description}
              </Text>
            )}
          </Box>
        </Flex>
      </Flex>
      <Stack isInline spacing={3} mt={5}>
        <Select value={selected} onChange={changeList}>
          <option value={-1}></option>
          {lists.map((list) => (
            <option key={list.id} value={list.id}>
              {list.title}
            </option>
          ))}
        </Select>
        {todo.list?.id !== selected && (
          <Button variantColor="blue" onClick={onSaveList}>
            Save
          </Button>
        )}
        <Stack spacing={3} isInline>
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
      </Stack>
    </Box>
  );
};

export default Todo;
