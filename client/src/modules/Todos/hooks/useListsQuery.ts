import {
  ListsQuery,
  useListsQuery as useBaseListsQuery,
  useMeQuery,
} from '../../../generated/graphql';

export const useMe = () => {
  const { loading, error, data } = useMeQuery();
  const me = (!loading && !error && data?.me) || null;

  return me;
};

export const useListsQuery = (
  showRelations: boolean = true,
  options?: Parameters<typeof useBaseListsQuery>[0]
): ReturnType<typeof useBaseListsQuery> => {
  const me = useMe();
  const { loading, error, data, ...rest } = useBaseListsQuery(options);
  let outData: ListsQuery | undefined = data;

  if (!loading && !error && me) {
    outData = {
      ...outData,
      // @ts-ignore
      lists: (outData?.lists || [])
        .map((list) => {
          const isShared = list.sharedWith.find((s) => s.id === me.id);

          if (isShared) {
            if (!showRelations) {
              return null;
            }

            return {
              ...list,
              title: `SHARED: ${list.title}`,
            };
          }

          return list;
        })
        .filter(Boolean),
    };
  }

  return { ...rest, loading, error, data: outData };
};
