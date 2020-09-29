import React, { useState } from 'react';
import { NextPage } from 'next';
import { Box, Spinner, Heading, Button } from '@chakra-ui/core';

import Nav from '../../../components/Nav';
import { useNotesQuery } from '../../../generated/graphql';
import useToggle from '../../../hooks/useToggle';
import Input from '../../../components/Input';

export const NotesPage: NextPage = () => {
  const { loading, error, data } = useNotesQuery();

  const [showNew, toggleNew, setNew] = useToggle();
  const [editingId, setEditingId] = useState(-1);

  return (
    <Box w="90%" maxW="1000px" m="0 auto">
      <Nav>
        <Button onClick={toggleNew} variantColor="blue">
          {showNew ? 'Hide new' : 'Show new'}
        </Button>
      </Nav>
      {/* {showNew && (
        <Box mb="5">
          <Flex justifyContent="space-between" align="center">
            <Heading>{editingId === -1 ? 'Add new tag' : `Editing tag-[${editingId}]`}</Heading>
            {editingId !== -1 && (
              <CloseButton
                onClick={() => {
                  setEditingId(-1);
                  setValue('text', '');
                }}
              />
            )}
          </Flex>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <Input name="text" ref={register({ required: true })} isRequired />
              <Select
                ref={register({ required: true })}
                isRequired
                name="color"
                bg={`${color}.100`}
              >
                {colors.map((color) => (
                  <option value={color}>{color}</option>
                ))}
              </Select>
              <Button type="submit">{editingId === -1 ? 'Create' : 'Update'}</Button>
            </Stack>
          </form>
        </Box>
      )} */}
      {loading ? (
        <Spinner />
      ) : error || !data ? (
        <Heading size="xl">Error :(</Heading>
      ) : (
        <Box>
          {data.todos.map((note) => (
            <Box>{note.title}</Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
