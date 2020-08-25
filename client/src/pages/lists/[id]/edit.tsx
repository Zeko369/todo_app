import React from 'react';
import { NextPage } from 'next';
import { Heading, Spinner } from '@chakra-ui/core';
import { useRouter } from 'next/router';

import { useListQuery, useUpdateListMutation } from '../../../generated/graphql';
import { getId } from '../../../helpers/getId';
import Link from '../../../components/Link';
import { LISTS_QUERY, LIST_QUERY } from '../../../graphql/queries';
import ListForm, { IListData } from '../../../components/ListForm';

const ListPage: NextPage = () => {
  const router = useRouter();
  const id = getId(router.query) || -1;

  const { loading, error, data } = useListQuery({ variables: { id } });
  const [update] = useUpdateListMutation({
    refetchQueries: [{ query: LISTS_QUERY }, { query: LIST_QUERY, variables: { id } }],
  });

  const onSubmit = async (data: IListData) => {
    await update({ variables: { id, ...data } });
    router.push('/lists');
  };

  return (
    <>
      <Heading>EDIT List: {data?.list?.title}</Heading>
      <Link href="/lists">Go back</Link>
      {loading ? (
        <Spinner />
      ) : error || !data ? (
        <Heading size="xl">Error :(</Heading>
      ) : data.list === null ? (
        <Heading size="xl">Can't find this list</Heading>
      ) : (
        <ListForm data={data.list} onSubmit={onSubmit} />
      )}
    </>
  );
};

export default ListPage;
