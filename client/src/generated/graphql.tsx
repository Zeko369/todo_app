import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  Json: any;
};

export type Query = {
  __typename?: 'Query';
  todo?: Maybe<Todo>;
  todos: Array<Todo>;
  list?: Maybe<List>;
  lists: Array<List>;
};


export type QueryTodoArgs = {
  where: TodoWhereUniqueInput;
};


export type QueryTodosArgs = {
  orderBy?: Maybe<TodoOrderByInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<TodoWhereUniqueInput>;
  after?: Maybe<TodoWhereUniqueInput>;
};


export type QueryListArgs = {
  where: ListWhereUniqueInput;
};


export type QueryListsArgs = {
  where?: Maybe<ListWhereInput>;
  orderBy?: Maybe<ListOrderByInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<ListWhereUniqueInput>;
  after?: Maybe<ListWhereUniqueInput>;
};

export type TodoWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
};

export type Todo = {
  __typename?: 'Todo';
  id: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  list?: Maybe<List>;
  checked: Scalars['Boolean'];
  checkedAt?: Maybe<Scalars['DateTime']>;
  requires: Array<Todo>;
  requiredBy: Array<Todo>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};


export type TodoRequiresArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<TodoWhereUniqueInput>;
  after?: Maybe<TodoWhereUniqueInput>;
};


export type TodoRequiredByArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<TodoWhereUniqueInput>;
  after?: Maybe<TodoWhereUniqueInput>;
};

export type List = {
  __typename?: 'List';
  id: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
  todos: Array<Todo>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};


export type ListTodosArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<TodoWhereUniqueInput>;
  after?: Maybe<TodoWhereUniqueInput>;
};


export type TodoOrderByInput = {
  id?: Maybe<OrderByArg>;
  title?: Maybe<OrderByArg>;
  description?: Maybe<OrderByArg>;
  checked?: Maybe<OrderByArg>;
  checkedAt?: Maybe<OrderByArg>;
  createdAt?: Maybe<OrderByArg>;
  listId?: Maybe<OrderByArg>;
  updatedAt?: Maybe<OrderByArg>;
};

export enum OrderByArg {
  Asc = 'asc',
  Desc = 'desc'
}

export type ListWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
};

export type ListWhereInput = {
  id?: Maybe<IntFilter>;
  title?: Maybe<NullableStringFilter>;
  todos?: Maybe<TodoFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  AND?: Maybe<Array<ListWhereInput>>;
  OR?: Maybe<Array<ListWhereInput>>;
  NOT?: Maybe<Array<ListWhereInput>>;
};

export type IntFilter = {
  equals?: Maybe<Scalars['Int']>;
  not?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Scalars['Int']>>;
  notIn?: Maybe<Array<Scalars['Int']>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
};

export type NullableStringFilter = {
  equals?: Maybe<Scalars['String']>;
  not?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  notIn?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
};

export type TodoFilter = {
  every?: Maybe<TodoWhereInput>;
  some?: Maybe<TodoWhereInput>;
  none?: Maybe<TodoWhereInput>;
};

export type TodoWhereInput = {
  id?: Maybe<IntFilter>;
  title?: Maybe<NullableStringFilter>;
  description?: Maybe<NullableStringFilter>;
  checked?: Maybe<BooleanFilter>;
  checkedAt?: Maybe<NullableDateTimeFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  listId?: Maybe<NullableIntFilter>;
  requires?: Maybe<TodoFilter>;
  requiredBy?: Maybe<TodoFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  AND?: Maybe<Array<TodoWhereInput>>;
  OR?: Maybe<Array<TodoWhereInput>>;
  NOT?: Maybe<Array<TodoWhereInput>>;
  list?: Maybe<ListWhereInput>;
};

export type BooleanFilter = {
  equals?: Maybe<Scalars['Boolean']>;
  not?: Maybe<Scalars['Boolean']>;
};

export type NullableDateTimeFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  not?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
};

export type DateTimeFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  not?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
};

export type NullableIntFilter = {
  equals?: Maybe<Scalars['Int']>;
  not?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Scalars['Int']>>;
  notIn?: Maybe<Array<Scalars['Int']>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
};

export type ListOrderByInput = {
  id?: Maybe<OrderByArg>;
  title?: Maybe<OrderByArg>;
  createdAt?: Maybe<OrderByArg>;
  updatedAt?: Maybe<OrderByArg>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createOneTodo: Todo;
  updateOneTodo?: Maybe<Todo>;
  deleteOneTodo?: Maybe<Todo>;
  checkTodo?: Maybe<Todo>;
  createOneList: List;
  updateOneList?: Maybe<List>;
  deleteOneList?: Maybe<List>;
};


export type MutationCreateOneTodoArgs = {
  data: TodoCreateInput;
};


export type MutationUpdateOneTodoArgs = {
  data: TodoUpdateInput;
  where: TodoWhereUniqueInput;
};


export type MutationDeleteOneTodoArgs = {
  where: TodoWhereUniqueInput;
};


export type MutationCheckTodoArgs = {
  id: Scalars['Int'];
};


export type MutationCreateOneListArgs = {
  data: ListCreateInput;
};


export type MutationUpdateOneListArgs = {
  data: ListUpdateInput;
  where: ListWhereUniqueInput;
};


export type MutationDeleteOneListArgs = {
  where: ListWhereUniqueInput;
};

export type TodoCreateInput = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  checked?: Maybe<Scalars['Boolean']>;
  checkedAt?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  list?: Maybe<ListCreateOneWithoutTodosInput>;
  requires?: Maybe<TodoCreateManyWithoutRequiredByInput>;
  requiredBy?: Maybe<TodoCreateManyWithoutRequiresInput>;
};

export type ListCreateOneWithoutTodosInput = {
  create?: Maybe<ListCreateWithoutTodosInput>;
  connect?: Maybe<ListWhereUniqueInput>;
};

export type ListCreateWithoutTodosInput = {
  title?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type TodoCreateManyWithoutRequiredByInput = {
  create?: Maybe<Array<TodoCreateWithoutRequiredByInput>>;
  connect?: Maybe<Array<TodoWhereUniqueInput>>;
};

export type TodoCreateWithoutRequiredByInput = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  checked?: Maybe<Scalars['Boolean']>;
  checkedAt?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  list?: Maybe<ListCreateOneWithoutTodosInput>;
  requires?: Maybe<TodoCreateManyWithoutRequiredByInput>;
};

export type TodoCreateManyWithoutRequiresInput = {
  create?: Maybe<Array<TodoCreateWithoutRequiresInput>>;
  connect?: Maybe<Array<TodoWhereUniqueInput>>;
};

export type TodoCreateWithoutRequiresInput = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  checked?: Maybe<Scalars['Boolean']>;
  checkedAt?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  list?: Maybe<ListCreateOneWithoutTodosInput>;
  requiredBy?: Maybe<TodoCreateManyWithoutRequiresInput>;
};

export type TodoUpdateInput = {
  id?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  checked?: Maybe<Scalars['Boolean']>;
  checkedAt?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  list?: Maybe<ListUpdateOneWithoutTodosInput>;
  requires?: Maybe<TodoUpdateManyWithoutRequiredByInput>;
  requiredBy?: Maybe<TodoUpdateManyWithoutRequiresInput>;
};

export type ListUpdateOneWithoutTodosInput = {
  create?: Maybe<ListCreateWithoutTodosInput>;
  connect?: Maybe<ListWhereUniqueInput>;
  disconnect?: Maybe<Scalars['Boolean']>;
  delete?: Maybe<Scalars['Boolean']>;
  update?: Maybe<ListUpdateWithoutTodosDataInput>;
  upsert?: Maybe<ListUpsertWithoutTodosInput>;
};

export type ListUpdateWithoutTodosDataInput = {
  id?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ListUpsertWithoutTodosInput = {
  update: ListUpdateWithoutTodosDataInput;
  create: ListCreateWithoutTodosInput;
};

export type TodoUpdateManyWithoutRequiredByInput = {
  create?: Maybe<Array<TodoCreateWithoutRequiredByInput>>;
  connect?: Maybe<Array<TodoWhereUniqueInput>>;
  set?: Maybe<Array<TodoWhereUniqueInput>>;
  disconnect?: Maybe<Array<TodoWhereUniqueInput>>;
  delete?: Maybe<Array<TodoWhereUniqueInput>>;
  update?: Maybe<Array<TodoUpdateWithWhereUniqueWithoutRequiredByInput>>;
  updateMany?: Maybe<Array<TodoUpdateManyWithWhereNestedInput>>;
  deleteMany?: Maybe<Array<TodoScalarWhereInput>>;
  upsert?: Maybe<Array<TodoUpsertWithWhereUniqueWithoutRequiredByInput>>;
};

export type TodoUpdateWithWhereUniqueWithoutRequiredByInput = {
  where: TodoWhereUniqueInput;
  data: TodoUpdateWithoutRequiredByDataInput;
};

export type TodoUpdateWithoutRequiredByDataInput = {
  id?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  checked?: Maybe<Scalars['Boolean']>;
  checkedAt?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  list?: Maybe<ListUpdateOneWithoutTodosInput>;
  requires?: Maybe<TodoUpdateManyWithoutRequiredByInput>;
};

export type TodoUpdateManyWithWhereNestedInput = {
  where: TodoScalarWhereInput;
  data: TodoUpdateManyDataInput;
};

export type TodoScalarWhereInput = {
  id?: Maybe<IntFilter>;
  title?: Maybe<NullableStringFilter>;
  description?: Maybe<NullableStringFilter>;
  checked?: Maybe<BooleanFilter>;
  checkedAt?: Maybe<NullableDateTimeFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  listId?: Maybe<NullableIntFilter>;
  requires?: Maybe<TodoFilter>;
  requiredBy?: Maybe<TodoFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  AND?: Maybe<Array<TodoScalarWhereInput>>;
  OR?: Maybe<Array<TodoScalarWhereInput>>;
  NOT?: Maybe<Array<TodoScalarWhereInput>>;
};

export type TodoUpdateManyDataInput = {
  id?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  checked?: Maybe<Scalars['Boolean']>;
  checkedAt?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type TodoUpsertWithWhereUniqueWithoutRequiredByInput = {
  where: TodoWhereUniqueInput;
  update: TodoUpdateWithoutRequiredByDataInput;
  create: TodoCreateWithoutRequiredByInput;
};

export type TodoUpdateManyWithoutRequiresInput = {
  create?: Maybe<Array<TodoCreateWithoutRequiresInput>>;
  connect?: Maybe<Array<TodoWhereUniqueInput>>;
  set?: Maybe<Array<TodoWhereUniqueInput>>;
  disconnect?: Maybe<Array<TodoWhereUniqueInput>>;
  delete?: Maybe<Array<TodoWhereUniqueInput>>;
  update?: Maybe<Array<TodoUpdateWithWhereUniqueWithoutRequiresInput>>;
  updateMany?: Maybe<Array<TodoUpdateManyWithWhereNestedInput>>;
  deleteMany?: Maybe<Array<TodoScalarWhereInput>>;
  upsert?: Maybe<Array<TodoUpsertWithWhereUniqueWithoutRequiresInput>>;
};

export type TodoUpdateWithWhereUniqueWithoutRequiresInput = {
  where: TodoWhereUniqueInput;
  data: TodoUpdateWithoutRequiresDataInput;
};

export type TodoUpdateWithoutRequiresDataInput = {
  id?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  checked?: Maybe<Scalars['Boolean']>;
  checkedAt?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  list?: Maybe<ListUpdateOneWithoutTodosInput>;
  requiredBy?: Maybe<TodoUpdateManyWithoutRequiresInput>;
};

export type TodoUpsertWithWhereUniqueWithoutRequiresInput = {
  where: TodoWhereUniqueInput;
  update: TodoUpdateWithoutRequiresDataInput;
  create: TodoCreateWithoutRequiresInput;
};

export type ListCreateInput = {
  title?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  todos?: Maybe<TodoCreateManyWithoutListInput>;
};

export type TodoCreateManyWithoutListInput = {
  create?: Maybe<Array<TodoCreateWithoutListInput>>;
  connect?: Maybe<Array<TodoWhereUniqueInput>>;
};

export type TodoCreateWithoutListInput = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  checked?: Maybe<Scalars['Boolean']>;
  checkedAt?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  requires?: Maybe<TodoCreateManyWithoutRequiredByInput>;
  requiredBy?: Maybe<TodoCreateManyWithoutRequiresInput>;
};

export type ListUpdateInput = {
  id?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  todos?: Maybe<TodoUpdateManyWithoutListInput>;
};

export type TodoUpdateManyWithoutListInput = {
  create?: Maybe<Array<TodoCreateWithoutListInput>>;
  connect?: Maybe<Array<TodoWhereUniqueInput>>;
  set?: Maybe<Array<TodoWhereUniqueInput>>;
  disconnect?: Maybe<Array<TodoWhereUniqueInput>>;
  delete?: Maybe<Array<TodoWhereUniqueInput>>;
  update?: Maybe<Array<TodoUpdateWithWhereUniqueWithoutListInput>>;
  updateMany?: Maybe<Array<TodoUpdateManyWithWhereNestedInput>>;
  deleteMany?: Maybe<Array<TodoScalarWhereInput>>;
  upsert?: Maybe<Array<TodoUpsertWithWhereUniqueWithoutListInput>>;
};

export type TodoUpdateWithWhereUniqueWithoutListInput = {
  where: TodoWhereUniqueInput;
  data: TodoUpdateWithoutListDataInput;
};

export type TodoUpdateWithoutListDataInput = {
  id?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  checked?: Maybe<Scalars['Boolean']>;
  checkedAt?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  requires?: Maybe<TodoUpdateManyWithoutRequiredByInput>;
  requiredBy?: Maybe<TodoUpdateManyWithoutRequiresInput>;
};

export type TodoUpsertWithWhereUniqueWithoutListInput = {
  where: TodoWhereUniqueInput;
  update: TodoUpdateWithoutListDataInput;
  create: TodoCreateWithoutListInput;
};


export type ListsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListsQuery = (
  { __typename?: 'Query' }
  & { lists: Array<(
    { __typename?: 'List' }
    & Pick<List, 'id' | 'title'>
    & { todos: Array<(
      { __typename?: 'Todo' }
      & Pick<Todo, 'id' | 'title'>
    )> }
  )> }
);

export type ListQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ListQuery = (
  { __typename?: 'Query' }
  & { list?: Maybe<(
    { __typename?: 'List' }
    & Pick<List, 'id' | 'title'>
    & { todos: Array<(
      { __typename?: 'Todo' }
      & Pick<Todo, 'id' | 'title' | 'description' | 'checked'>
    )> }
  )> }
);

export type CreateListMutationVariables = Exact<{
  title?: Maybe<Scalars['String']>;
}>;


export type CreateListMutation = (
  { __typename?: 'Mutation' }
  & { createOneList: (
    { __typename?: 'List' }
    & Pick<List, 'id' | 'title'>
  ) }
);

export type UpdateListMutationVariables = Exact<{
  id: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
}>;


export type UpdateListMutation = (
  { __typename?: 'Mutation' }
  & { updateOneList?: Maybe<(
    { __typename?: 'List' }
    & Pick<List, 'id' | 'title'>
  )> }
);

export type TodosQueryVariables = Exact<{ [key: string]: never; }>;


export type TodosQuery = (
  { __typename?: 'Query' }
  & { todos: Array<(
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'title' | 'description' | 'checked'>
  )> }
);

export type CheckTodoMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type CheckTodoMutation = (
  { __typename?: 'Mutation' }
  & { checkTodo?: Maybe<(
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'checked'>
  )> }
);

export type DeleteTodoMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteTodoMutation = (
  { __typename?: 'Mutation' }
  & { deleteOneTodo?: Maybe<(
    { __typename?: 'Todo' }
    & Pick<Todo, 'id'>
  )> }
);

export type CreateTodoMutationVariables = Exact<{
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
}>;


export type CreateTodoMutation = (
  { __typename?: 'Mutation' }
  & { createOneTodo: (
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'title' | 'description'>
  ) }
);

export type UpdateTodoMutationVariables = Exact<{
  id: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
}>;


export type UpdateTodoMutation = (
  { __typename?: 'Mutation' }
  & { updateOneTodo?: Maybe<(
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'title' | 'description'>
  )> }
);


export const ListsDocument = gql`
    query LISTS {
  lists(orderBy: {id: desc}) {
    id
    title
    todos(last: 5) {
      id
      title
    }
  }
}
    `;

/**
 * __useListsQuery__
 *
 * To run a query within a React component, call `useListsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListsQuery({
 *   variables: {
 *   },
 * });
 */
export function useListsQuery(baseOptions?: Apollo.QueryHookOptions<ListsQuery, ListsQueryVariables>) {
        return Apollo.useQuery<ListsQuery, ListsQueryVariables>(ListsDocument, baseOptions);
      }
export function useListsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListsQuery, ListsQueryVariables>) {
          return Apollo.useLazyQuery<ListsQuery, ListsQueryVariables>(ListsDocument, baseOptions);
        }
export type ListsQueryHookResult = ReturnType<typeof useListsQuery>;
export type ListsLazyQueryHookResult = ReturnType<typeof useListsLazyQuery>;
export type ListsQueryResult = Apollo.QueryResult<ListsQuery, ListsQueryVariables>;
export const ListDocument = gql`
    query LIST($id: Int!) {
  list(where: {id: $id}) {
    id
    title
    todos {
      id
      title
      description
      checked
    }
  }
}
    `;

/**
 * __useListQuery__
 *
 * To run a query within a React component, call `useListQuery` and pass it any options that fit your needs.
 * When your component renders, `useListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useListQuery(baseOptions?: Apollo.QueryHookOptions<ListQuery, ListQueryVariables>) {
        return Apollo.useQuery<ListQuery, ListQueryVariables>(ListDocument, baseOptions);
      }
export function useListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListQuery, ListQueryVariables>) {
          return Apollo.useLazyQuery<ListQuery, ListQueryVariables>(ListDocument, baseOptions);
        }
export type ListQueryHookResult = ReturnType<typeof useListQuery>;
export type ListLazyQueryHookResult = ReturnType<typeof useListLazyQuery>;
export type ListQueryResult = Apollo.QueryResult<ListQuery, ListQueryVariables>;
export const CreateListDocument = gql`
    mutation createList($title: String) {
  createOneList(data: {title: $title}) {
    id
    title
  }
}
    `;
export type CreateListMutationFn = Apollo.MutationFunction<CreateListMutation, CreateListMutationVariables>;

/**
 * __useCreateListMutation__
 *
 * To run a mutation, you first call `useCreateListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createListMutation, { data, loading, error }] = useCreateListMutation({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreateListMutation(baseOptions?: Apollo.MutationHookOptions<CreateListMutation, CreateListMutationVariables>) {
        return Apollo.useMutation<CreateListMutation, CreateListMutationVariables>(CreateListDocument, baseOptions);
      }
export type CreateListMutationHookResult = ReturnType<typeof useCreateListMutation>;
export type CreateListMutationResult = Apollo.MutationResult<CreateListMutation>;
export type CreateListMutationOptions = Apollo.BaseMutationOptions<CreateListMutation, CreateListMutationVariables>;
export const UpdateListDocument = gql`
    mutation updateList($id: Int!, $title: String) {
  updateOneList(where: {id: $id}, data: {title: $title}) {
    id
    title
  }
}
    `;
export type UpdateListMutationFn = Apollo.MutationFunction<UpdateListMutation, UpdateListMutationVariables>;

/**
 * __useUpdateListMutation__
 *
 * To run a mutation, you first call `useUpdateListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateListMutation, { data, loading, error }] = useUpdateListMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useUpdateListMutation(baseOptions?: Apollo.MutationHookOptions<UpdateListMutation, UpdateListMutationVariables>) {
        return Apollo.useMutation<UpdateListMutation, UpdateListMutationVariables>(UpdateListDocument, baseOptions);
      }
export type UpdateListMutationHookResult = ReturnType<typeof useUpdateListMutation>;
export type UpdateListMutationResult = Apollo.MutationResult<UpdateListMutation>;
export type UpdateListMutationOptions = Apollo.BaseMutationOptions<UpdateListMutation, UpdateListMutationVariables>;
export const TodosDocument = gql`
    query TODOS {
  todos(orderBy: {id: desc}) {
    id
    title
    description
    checked
  }
}
    `;

/**
 * __useTodosQuery__
 *
 * To run a query within a React component, call `useTodosQuery` and pass it any options that fit your needs.
 * When your component renders, `useTodosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTodosQuery({
 *   variables: {
 *   },
 * });
 */
export function useTodosQuery(baseOptions?: Apollo.QueryHookOptions<TodosQuery, TodosQueryVariables>) {
        return Apollo.useQuery<TodosQuery, TodosQueryVariables>(TodosDocument, baseOptions);
      }
export function useTodosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TodosQuery, TodosQueryVariables>) {
          return Apollo.useLazyQuery<TodosQuery, TodosQueryVariables>(TodosDocument, baseOptions);
        }
export type TodosQueryHookResult = ReturnType<typeof useTodosQuery>;
export type TodosLazyQueryHookResult = ReturnType<typeof useTodosLazyQuery>;
export type TodosQueryResult = Apollo.QueryResult<TodosQuery, TodosQueryVariables>;
export const CheckTodoDocument = gql`
    mutation checkTodo($id: Int!) {
  checkTodo(id: $id) {
    id
    checked
  }
}
    `;
export type CheckTodoMutationFn = Apollo.MutationFunction<CheckTodoMutation, CheckTodoMutationVariables>;

/**
 * __useCheckTodoMutation__
 *
 * To run a mutation, you first call `useCheckTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCheckTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [checkTodoMutation, { data, loading, error }] = useCheckTodoMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCheckTodoMutation(baseOptions?: Apollo.MutationHookOptions<CheckTodoMutation, CheckTodoMutationVariables>) {
        return Apollo.useMutation<CheckTodoMutation, CheckTodoMutationVariables>(CheckTodoDocument, baseOptions);
      }
export type CheckTodoMutationHookResult = ReturnType<typeof useCheckTodoMutation>;
export type CheckTodoMutationResult = Apollo.MutationResult<CheckTodoMutation>;
export type CheckTodoMutationOptions = Apollo.BaseMutationOptions<CheckTodoMutation, CheckTodoMutationVariables>;
export const DeleteTodoDocument = gql`
    mutation deleteTodo($id: Int!) {
  deleteOneTodo(where: {id: $id}) {
    id
  }
}
    `;
export type DeleteTodoMutationFn = Apollo.MutationFunction<DeleteTodoMutation, DeleteTodoMutationVariables>;

/**
 * __useDeleteTodoMutation__
 *
 * To run a mutation, you first call `useDeleteTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTodoMutation, { data, loading, error }] = useDeleteTodoMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTodoMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTodoMutation, DeleteTodoMutationVariables>) {
        return Apollo.useMutation<DeleteTodoMutation, DeleteTodoMutationVariables>(DeleteTodoDocument, baseOptions);
      }
export type DeleteTodoMutationHookResult = ReturnType<typeof useDeleteTodoMutation>;
export type DeleteTodoMutationResult = Apollo.MutationResult<DeleteTodoMutation>;
export type DeleteTodoMutationOptions = Apollo.BaseMutationOptions<DeleteTodoMutation, DeleteTodoMutationVariables>;
export const CreateTodoDocument = gql`
    mutation createTodo($title: String!, $description: String) {
  createOneTodo(data: {title: $title, description: $description}) {
    id
    title
    description
  }
}
    `;
export type CreateTodoMutationFn = Apollo.MutationFunction<CreateTodoMutation, CreateTodoMutationVariables>;

/**
 * __useCreateTodoMutation__
 *
 * To run a mutation, you first call `useCreateTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTodoMutation, { data, loading, error }] = useCreateTodoMutation({
 *   variables: {
 *      title: // value for 'title'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateTodoMutation(baseOptions?: Apollo.MutationHookOptions<CreateTodoMutation, CreateTodoMutationVariables>) {
        return Apollo.useMutation<CreateTodoMutation, CreateTodoMutationVariables>(CreateTodoDocument, baseOptions);
      }
export type CreateTodoMutationHookResult = ReturnType<typeof useCreateTodoMutation>;
export type CreateTodoMutationResult = Apollo.MutationResult<CreateTodoMutation>;
export type CreateTodoMutationOptions = Apollo.BaseMutationOptions<CreateTodoMutation, CreateTodoMutationVariables>;
export const UpdateTodoDocument = gql`
    mutation updateTodo($id: Int!, $title: String, $description: String) {
  updateOneTodo(where: {id: $id}, data: {title: $title, description: $description}) {
    id
    title
    description
  }
}
    `;
export type UpdateTodoMutationFn = Apollo.MutationFunction<UpdateTodoMutation, UpdateTodoMutationVariables>;

/**
 * __useUpdateTodoMutation__
 *
 * To run a mutation, you first call `useUpdateTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTodoMutation, { data, loading, error }] = useUpdateTodoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useUpdateTodoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTodoMutation, UpdateTodoMutationVariables>) {
        return Apollo.useMutation<UpdateTodoMutation, UpdateTodoMutationVariables>(UpdateTodoDocument, baseOptions);
      }
export type UpdateTodoMutationHookResult = ReturnType<typeof useUpdateTodoMutation>;
export type UpdateTodoMutationResult = Apollo.MutationResult<UpdateTodoMutation>;
export type UpdateTodoMutationOptions = Apollo.BaseMutationOptions<UpdateTodoMutation, UpdateTodoMutationVariables>;

      export interface IntrospectionResultData {
        __schema: {
          types: {
            kind: string;
            name: string;
            possibleTypes: {
              name: string;
            }[];
          }[];
        };
      }
      const result: IntrospectionResultData = {
  "__schema": {
    "types": []
  }
};
      export default result;
    