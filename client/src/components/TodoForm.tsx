import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Heading, Stack, Box, Button } from '@chakra-ui/core';
import Input from './Input';
import config from '../config';
import { mutate } from 'swr';

interface Props {
  type: 'new' | 'edit';
}

const TodoForm: React.FC<Props> = ({ type }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: { title: string; description?: string }) => {
    setLoading(true);
    if (type === 'new') {
      fetch(config.apiUrl('/todos'), {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' },
      })
        .then((res) => res.json())
        .then(() => mutate(config.apiUrl('/todos')))
        .catch((err) => console.error(err))
        .finally(() => {
          setLoading(false);
          reset();
        });
    }
  };

  return (
    <Box p={3} shadow="md" borderWidth="1px" mb={6}>
      <Heading fontSize="lg" mb={2}>
        {type === 'new' ? 'New TODO' : 'Edit TODO'}
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Input name="title" ref={register()} isRequired />
          <Input name="description" ref={register()} />
          <Button type="submit" variantColor="green" isLoading={loading}>
            {type === 'new' ? 'Add' : 'Update'}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default TodoForm;
