import { TodosQuery, useTodosQuery as useBaseTodosQuery } from '../../../generated/graphql';
import { useMe } from './useListsQuery';

type Out = ReturnType<typeof useBaseTodosQuery>;

type CustomTodosData = {
  _typename: 'Query' | undefined;
  todos: (TodosQuery['todos'][0] & { shared?: boolean })[];
};

interface Return extends Out {
  data: CustomTodosData | undefined;
}

export const useTodosQuery = (
  showRelations: boolean = true,
  options?: Parameters<typeof useBaseTodosQuery>[0]
): Return => {
  const me = useMe();
  const { loading, error, data, ...rest } = useBaseTodosQuery(options);
  let outData: CustomTodosData | undefined;

  if (!loading && !error && me) {
    outData = {
      ...data,
      // @ts-ignore
      todos: (data?.todos || [])
        .map((todo) => {
          const isShared = todo.list?.sharedWith.find((s) => s.id === me.id);

          if (isShared) {
            if (!showRelations) {
              return null;
            }

            return {
              ...todo,
              shared: true,
            };
          }

          return todo;
        })
        .filter(Boolean),
    };
  }

  return { ...rest, loading, error, data: outData || undefined };
};
