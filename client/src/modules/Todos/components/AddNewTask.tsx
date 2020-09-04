import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Input, Button, Stack } from '@chakra-ui/core';
import { useAddTaskMutation } from '../../../generated/graphql';
import { TODO_QUERY } from '../graphql/queries';

interface AddNewTaskProps {
  todoId: number;
}

interface FormData {
  title: string;
}

export const AddNewTask: React.FC<AddNewTaskProps> = ({ todoId }) => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [addTask] = useAddTaskMutation({
    refetchQueries: [{ query: TODO_QUERY, variables: { id: todoId } }],
  });

  const onSubmit = async (data: FormData) => {
    await addTask({ variables: { todoId, ...data } });
    reset();
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} isInline>
          <Input ref={register} name="title" placeholder="New task..." />
          <Button type="submit" variantColor="green">
            Add
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
