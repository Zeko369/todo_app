import React from 'react';
import { NextPage } from 'next';
import { Heading, Spinner, Box } from '@chakra-ui/core';
import { useRouter } from 'next/router';

import { useListQuery, useUpdateListMutation } from '../../../../generated/graphql';
import { getId } from '../../../../helpers/getId';
import ListForm, { IListData } from '../../components/ListForm';
import Nav from '../../../../components/Nav';
import { LISTS_QUERY, LIST_QUERY } from '../../graphql/queries';

export const refetch = (id: number) => ({
  refetchQueries: [{ query: LISTS_QUERY }, { query: LIST_QUERY, variables: { id } }],
});

export const EditListPage: NextPage = () => {
  const router = useRouter();
  const id = getId(router.query) || -1;

  const { loading, error, data } = useListQuery({ variables: { id } });
  const [update] = useUpdateListMutation(refetch(id));

  const onSubmit = async (data: IListData) => {
    await update({ variables: { id, ...data } });
    router.push('/lists');
  };

  return (
    <Box w="90%" maxW="1000px" m="0 auto">
      <Nav />
      <Heading>EDIT List: {data?.list?.title}</Heading>
      {loading ? (
        <Spinner />
      ) : error || !data ? (
        <Heading size="xl">Error :(</Heading>
      ) : data.list === null ? (
        <Heading size="xl">Can't find this list</Heading>
      ) : (
        <ListForm data={data.list} onSubmit={onSubmit} />
      )}
    </Box>
  );
};
