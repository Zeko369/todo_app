import React from 'react';
import { NextPage } from 'next';
import { Heading, Box } from '@chakra-ui/core';
import { useRouter } from 'next/router';

import { useCreateListMutation } from '../../generated/graphql';
import Link from '../../components/Link';
import ListForm, { IListData } from '../../components/ListForm';
import { LISTS_QUERY } from '../../graphql/queries';
import Nav from '../../components/Nav';

const NewList: NextPage = () => {
  const router = useRouter();
  const [createList] = useCreateListMutation({ refetchQueries: [{ query: LISTS_QUERY }] });

  const onSubmit = async (data: IListData) => {
    await createList({ variables: { ...data } });
    router.push('/lists');
  };

  return (
    <Box w="90%" maxW="1000px" m="0 auto">
      <Nav />
      <Heading>New list</Heading>
      <Link href="/lists">Go back</Link>
      <ListForm onSubmit={onSubmit} />
    </Box>
  );
};

export default NewList;
