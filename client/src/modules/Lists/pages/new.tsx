import React from 'react';
import { NextPage } from 'next';
import { Heading, Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Link } from 'chakra-next-link';

import { useCreateListMutation } from '../../../generated/graphql';
import ListForm, { IListData } from '../components/ListForm';
import { LISTS_QUERY } from '../graphql/queries';
import Nav from '../../../components/Nav';

export const NewListPage: NextPage = () => {
  const router = useRouter();
  const [createList] = useCreateListMutation({ refetchQueries: [{ query: LISTS_QUERY }] });

  const onSubmit = async (data: IListData) => {
    const { title } = data;

    if (title) {
      await createList({ variables: { title } });
      router.push('/lists');
    }
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
