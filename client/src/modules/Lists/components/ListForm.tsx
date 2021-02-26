import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@chakra-ui/react';

import Input from '../../../components/Input';
import { List } from '../../../generated/graphql';

export type IListData = Pick<List, 'title'>;

interface ListFormProps {
  onSubmit: (data: IListData) => Promise<void>;
  data?: IListData;
}

const ListForm: React.FC<ListFormProps> = ({ onSubmit, data }) => {
  const { register, handleSubmit, formState } = useForm<IListData>({ defaultValues: { ...data } });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input name="title" ref={register({ required: true })} isRequired />
      <Button type="submit" isLoading={formState.isSubmitting}>
        {data ? 'Update' : 'Create'}
      </Button>
    </form>
  );
};

export default ListForm;
