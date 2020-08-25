import React from 'react';
import { NextPage } from 'next';
import { useCreateListMutation } from '../../generated/graphql';
import { Heading } from '@chakra-ui/core';
import Link from '../../components/Link';
import ListForm, { IListData } from '../../components/ListForm';
import { LISTS_QUERY } from '../../graphql/queries';
import { useRouter } from 'next/router';

const NewList: NextPage = () => {
  const router = useRouter();
  const [createList] = useCreateListMutation({ refetchQueries: [{ query: LISTS_QUERY }] });

  const onSubmit = async (data: IListData) => {
    await createList({ variables: { ...data } });
    router.push('/lists');
  };

  return (
    <>
      <Heading>New list</Heading>
      <Link href="/lists">Go back</Link>
      <ListForm onSubmit={onSubmit} />
    </>
  );
};

export default NewList;
