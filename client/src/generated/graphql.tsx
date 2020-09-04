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
  task?: Maybe<Task>;
  tasks: Array<Task>;
  todo?: Maybe<Todo>;
  todos: Array<Todo>;
  list?: Maybe<List>;
  lists: Array<List>;
  tag?: Maybe<Tag>;
  tags: Array<Tag>;
};


export type QueryTaskArgs = {
  where: TaskWhereUniqueInput;
};


export type QueryTasksArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<TaskWhereUniqueInput>;
  after?: Maybe<TaskWhereUniqueInput>;
};


export type QueryTodoArgs = {
  where: TodoWhereUniqueInput;
};


export type QueryTodosArgs = {
  orderBy?: Maybe<Array<TodoOrderByInput>>;
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
  orderBy?: Maybe<Array<ListOrderByInput>>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<ListWhereUniqueInput>;
  after?: Maybe<ListWhereUniqueInput>;
};


export type QueryTagArgs = {
  where: TagWhereUniqueInput;
};


export type QueryTagsArgs = {
  orderBy?: Maybe<Array<TagOrderByInput>>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<TagWhereUniqueInput>;
  after?: Maybe<TagWhereUniqueInput>;
};

export type TaskWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
};

export type Task = {
  __typename?: 'Task';
  id: Scalars['Int'];
  title: Scalars['String'];
  todo?: Maybe<Todo>;
  checkedAt?: Maybe<Scalars['DateTime']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Todo = {
  __typename?: 'Todo';
  id: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  list?: Maybe<List>;
  tags: Array<Tag>;
  tasks: Array<Task>;
  checked: Scalars['Boolean'];
  checkedAt?: Maybe<Scalars['DateTime']>;
  requires: Array<Todo>;
  requiredBy: Array<Todo>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};


export type TodoTagsArgs = {
  where?: Maybe<TagWhereInput>;
  orderBy?: Maybe<Array<TagOrderByInput>>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<TagWhereUniqueInput>;
  after?: Maybe<TagWhereUniqueInput>;
};


export type TodoTasksArgs = {
  where?: Maybe<TaskWhereInput>;
  orderBy?: Maybe<Array<TaskOrderByInput>>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<TaskWhereUniqueInput>;
  after?: Maybe<TaskWhereUniqueInput>;
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
  archivedAt?: Maybe<Scalars['DateTime']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};


export type ListTodosArgs = {
  orderBy?: Maybe<Array<TodoOrderByInput>>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<TodoWhereUniqueInput>;
  after?: Maybe<TodoWhereUniqueInput>;
};

export type TodoOrderByInput = {
  id?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  description?: Maybe<SortOrder>;
  checked?: Maybe<SortOrder>;
  checkedAt?: Maybe<SortOrder>;
  listId?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type TodoWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
};


export type TagWhereInput = {
  AND?: Maybe<Array<TagWhereInput>>;
  OR?: Maybe<Array<TagWhereInput>>;
  NOT?: Maybe<Array<TagWhereInput>>;
  id?: Maybe<IntFilter>;
  text?: Maybe<StringFilter>;
  color?: Maybe<StringNullableFilter>;
  todos?: Maybe<TodoListRelationFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
};

export type IntFilter = {
  equals?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Scalars['Int']>>;
  notIn?: Maybe<Array<Scalars['Int']>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
  not?: Maybe<NestedIntFilter>;
};

export type NestedIntFilter = {
  equals?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Scalars['Int']>>;
  notIn?: Maybe<Array<Scalars['Int']>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
  not?: Maybe<NestedIntFilter>;
};

export type StringFilter = {
  equals?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  notIn?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  not?: Maybe<NestedStringFilter>;
};

export type NestedStringFilter = {
  equals?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  notIn?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  not?: Maybe<NestedStringFilter>;
};

export type StringNullableFilter = {
  equals?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  notIn?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  not?: Maybe<NestedStringNullableFilter>;
};

export type NestedStringNullableFilter = {
  equals?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  notIn?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  not?: Maybe<NestedStringNullableFilter>;
};

export type TodoListRelationFilter = {
  every?: Maybe<TodoWhereInput>;
  some?: Maybe<TodoWhereInput>;
  none?: Maybe<TodoWhereInput>;
};

export type TodoWhereInput = {
  AND?: Maybe<Array<TodoWhereInput>>;
  OR?: Maybe<Array<TodoWhereInput>>;
  NOT?: Maybe<Array<TodoWhereInput>>;
  id?: Maybe<IntFilter>;
  title?: Maybe<StringNullableFilter>;
  description?: Maybe<StringNullableFilter>;
  checked?: Maybe<BoolFilter>;
  checkedAt?: Maybe<DateTimeNullableFilter>;
  tasks?: Maybe<TaskListRelationFilter>;
  list?: Maybe<ListWhereInput>;
  listId?: Maybe<IntNullableFilter>;
  requires?: Maybe<TodoListRelationFilter>;
  requiredBy?: Maybe<TodoListRelationFilter>;
  tags?: Maybe<TagListRelationFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
};

export type BoolFilter = {
  equals?: Maybe<Scalars['Boolean']>;
  not?: Maybe<NestedBoolFilter>;
};

export type NestedBoolFilter = {
  equals?: Maybe<Scalars['Boolean']>;
  not?: Maybe<NestedBoolFilter>;
};

export type DateTimeNullableFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  not?: Maybe<NestedDateTimeNullableFilter>;
};

export type NestedDateTimeNullableFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  not?: Maybe<NestedDateTimeNullableFilter>;
};

export type TaskListRelationFilter = {
  every?: Maybe<TaskWhereInput>;
  some?: Maybe<TaskWhereInput>;
  none?: Maybe<TaskWhereInput>;
};

export type TaskWhereInput = {
  AND?: Maybe<Array<TaskWhereInput>>;
  OR?: Maybe<Array<TaskWhereInput>>;
  NOT?: Maybe<Array<TaskWhereInput>>;
  id?: Maybe<IntFilter>;
  todo?: Maybe<TodoWhereInput>;
  todoId?: Maybe<IntNullableFilter>;
  title?: Maybe<StringFilter>;
  checkedAt?: Maybe<DateTimeNullableFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
};

export type IntNullableFilter = {
  equals?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Scalars['Int']>>;
  notIn?: Maybe<Array<Scalars['Int']>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
  not?: Maybe<NestedIntNullableFilter>;
};

export type NestedIntNullableFilter = {
  equals?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Scalars['Int']>>;
  notIn?: Maybe<Array<Scalars['Int']>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
  not?: Maybe<NestedIntNullableFilter>;
};

export type DateTimeFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  not?: Maybe<NestedDateTimeFilter>;
};

export type NestedDateTimeFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  not?: Maybe<NestedDateTimeFilter>;
};

export type ListWhereInput = {
  AND?: Maybe<Array<ListWhereInput>>;
  OR?: Maybe<Array<ListWhereInput>>;
  NOT?: Maybe<Array<ListWhereInput>>;
  id?: Maybe<IntFilter>;
  title?: Maybe<StringNullableFilter>;
  todos?: Maybe<TodoListRelationFilter>;
  archivedAt?: Maybe<DateTimeNullableFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
};

export type TagListRelationFilter = {
  every?: Maybe<TagWhereInput>;
  some?: Maybe<TagWhereInput>;
  none?: Maybe<TagWhereInput>;
};

export type TagOrderByInput = {
  id?: Maybe<SortOrder>;
  text?: Maybe<SortOrder>;
  color?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
};

export type TagWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['Int'];
  text: Scalars['String'];
  color?: Maybe<Scalars['String']>;
  todos: Array<Todo>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};


export type TagTodosArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<TodoWhereUniqueInput>;
  after?: Maybe<TodoWhereUniqueInput>;
};

export type TaskOrderByInput = {
  id?: Maybe<SortOrder>;
  todoId?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  checkedAt?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
};

export type ListWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
};

export type ListOrderByInput = {
  id?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  archivedAt?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createOneTag: Tag;
  updateOneTag?: Maybe<Tag>;
  deleteOneTag?: Maybe<Tag>;
  createOneTask: Task;
  updateOneTask?: Maybe<Task>;
  updateManyTask: BatchPayload;
  deleteOneTask?: Maybe<Task>;
  deleteManyTask: BatchPayload;
  checkTask?: Maybe<Task>;
  createOneTodo: Todo;
  updateOneTodo?: Maybe<Todo>;
  updateManyTodo: BatchPayload;
  deleteOneTodo?: Maybe<Todo>;
  deleteManyTodo: BatchPayload;
  checkTodo?: Maybe<Todo>;
  createOneList: List;
  updateOneList?: Maybe<List>;
  deleteOneList?: Maybe<List>;
};


export type MutationCreateOneTagArgs = {
  data: TagCreateInput;
};


export type MutationUpdateOneTagArgs = {
  data: TagUpdateInput;
  where: TagWhereUniqueInput;
};


export type MutationDeleteOneTagArgs = {
  where: TagWhereUniqueInput;
};


export type MutationCreateOneTaskArgs = {
  data: TaskCreateInput;
};


export type MutationUpdateOneTaskArgs = {
  data: TaskUpdateInput;
  where: TaskWhereUniqueInput;
};


export type MutationUpdateManyTaskArgs = {
  data: TaskUpdateManyMutationInput;
  where?: Maybe<TaskWhereInput>;
};


export type MutationDeleteOneTaskArgs = {
  where: TaskWhereUniqueInput;
};


export type MutationDeleteManyTaskArgs = {
  where?: Maybe<TaskWhereInput>;
};


export type MutationCheckTaskArgs = {
  id: Scalars['Int'];
};


export type MutationCreateOneTodoArgs = {
  data: TodoCreateInput;
};


export type MutationUpdateOneTodoArgs = {
  data: TodoUpdateInput;
  where: TodoWhereUniqueInput;
};


export type MutationUpdateManyTodoArgs = {
  data: TodoUpdateManyMutationInput;
  where?: Maybe<TodoWhereInput>;
};


export type MutationDeleteOneTodoArgs = {
  where: TodoWhereUniqueInput;
};


export type MutationDeleteManyTodoArgs = {
  where?: Maybe<TodoWhereInput>;
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

export type TagCreateInput = {
  text: Scalars['String'];
  color?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  todos?: Maybe<TodoCreateManyWithoutTagsInput>;
};

export type TodoCreateManyWithoutTagsInput = {
  create?: Maybe<Array<TodoCreateWithoutTagsInput>>;
  connect?: Maybe<Array<TodoWhereUniqueInput>>;
};

export type TodoCreateWithoutTagsInput = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  checked?: Maybe<Scalars['Boolean']>;
  checkedAt?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  tasks?: Maybe<TaskCreateManyWithoutTodoInput>;
  list?: Maybe<ListCreateOneWithoutTodosInput>;
  requires?: Maybe<TodoCreateManyWithoutRequiredByInput>;
  requiredBy?: Maybe<TodoCreateManyWithoutRequiresInput>;
};

export type TaskCreateManyWithoutTodoInput = {
  create?: Maybe<Array<TaskCreateWithoutTodoInput>>;
  connect?: Maybe<Array<TaskWhereUniqueInput>>;
};

export type TaskCreateWithoutTodoInput = {
  title: Scalars['String'];
  checkedAt?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ListCreateOneWithoutTodosInput = {
  create?: Maybe<ListCreateWithoutTodosInput>;
  connect?: Maybe<ListWhereUniqueInput>;
};

export type ListCreateWithoutTodosInput = {
  title?: Maybe<Scalars['String']>;
  archivedAt?: Maybe<Scalars['DateTime']>;
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
  tasks?: Maybe<TaskCreateManyWithoutTodoInput>;
  list?: Maybe<ListCreateOneWithoutTodosInput>;
  requires?: Maybe<TodoCreateManyWithoutRequiredByInput>;
  tags?: Maybe<TagCreateManyWithoutTodosInput>;
};

export type TagCreateManyWithoutTodosInput = {
  create?: Maybe<Array<TagCreateWithoutTodosInput>>;
  connect?: Maybe<Array<TagWhereUniqueInput>>;
};

export type TagCreateWithoutTodosInput = {
  text: Scalars['String'];
  color?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
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
  tasks?: Maybe<TaskCreateManyWithoutTodoInput>;
  list?: Maybe<ListCreateOneWithoutTodosInput>;
  requiredBy?: Maybe<TodoCreateManyWithoutRequiresInput>;
  tags?: Maybe<TagCreateManyWithoutTodosInput>;
};

export type TagUpdateInput = {
  text?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  todos?: Maybe<TodoUpdateManyWithoutTagsInput>;
};

export type TodoUpdateManyWithoutTagsInput = {
  create?: Maybe<Array<TodoCreateWithoutTagsInput>>;
  connect?: Maybe<Array<TodoWhereUniqueInput>>;
  set?: Maybe<Array<TodoWhereUniqueInput>>;
  disconnect?: Maybe<Array<TodoWhereUniqueInput>>;
  delete?: Maybe<Array<TodoWhereUniqueInput>>;
  update?: Maybe<Array<TodoUpdateWithWhereUniqueWithoutTagsInput>>;
  updateMany?: Maybe<Array<TodoUpdateManyWithWhereNestedInput>>;
  deleteMany?: Maybe<Array<TodoScalarWhereInput>>;
  upsert?: Maybe<Array<TodoUpsertWithWhereUniqueWithoutTagsInput>>;
};

export type TodoUpdateWithWhereUniqueWithoutTagsInput = {
  where: TodoWhereUniqueInput;
  data: TodoUpdateWithoutTagsDataInput;
};

export type TodoUpdateWithoutTagsDataInput = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  checked?: Maybe<Scalars['Boolean']>;
  checkedAt?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  tasks?: Maybe<TaskUpdateManyWithoutTodoInput>;
  list?: Maybe<ListUpdateOneWithoutTodosInput>;
  requires?: Maybe<TodoUpdateManyWithoutRequiredByInput>;
  requiredBy?: Maybe<TodoUpdateManyWithoutRequiresInput>;
};

export type TaskUpdateManyWithoutTodoInput = {
  create?: Maybe<Array<TaskCreateWithoutTodoInput>>;
  connect?: Maybe<Array<TaskWhereUniqueInput>>;
  set?: Maybe<Array<TaskWhereUniqueInput>>;
  disconnect?: Maybe<Array<TaskWhereUniqueInput>>;
  delete?: Maybe<Array<TaskWhereUniqueInput>>;
  update?: Maybe<Array<TaskUpdateWithWhereUniqueWithoutTodoInput>>;
  updateMany?: Maybe<Array<TaskUpdateManyWithWhereNestedInput>>;
  deleteMany?: Maybe<Array<TaskScalarWhereInput>>;
  upsert?: Maybe<Array<TaskUpsertWithWhereUniqueWithoutTodoInput>>;
};

export type TaskUpdateWithWhereUniqueWithoutTodoInput = {
  where: TaskWhereUniqueInput;
  data: TaskUpdateWithoutTodoDataInput;
};

export type TaskUpdateWithoutTodoDataInput = {
  title?: Maybe<Scalars['String']>;
  checkedAt?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type TaskUpdateManyWithWhereNestedInput = {
  where: TaskScalarWhereInput;
  data: TaskUpdateManyDataInput;
};

export type TaskScalarWhereInput = {
  AND?: Maybe<Array<TaskScalarWhereInput>>;
  OR?: Maybe<Array<TaskScalarWhereInput>>;
  NOT?: Maybe<Array<TaskScalarWhereInput>>;
  id?: Maybe<IntFilter>;
  todoId?: Maybe<IntNullableFilter>;
  title?: Maybe<StringFilter>;
  checkedAt?: Maybe<DateTimeNullableFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
};

export type TaskUpdateManyDataInput = {
  title?: Maybe<Scalars['String']>;
  checkedAt?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type TaskUpsertWithWhereUniqueWithoutTodoInput = {
  where: TaskWhereUniqueInput;
  update: TaskUpdateWithoutTodoDataInput;
  create: TaskCreateWithoutTodoInput;
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
  title?: Maybe<Scalars['String']>;
  archivedAt?: Maybe<Scalars['DateTime']>;
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
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  checked?: Maybe<Scalars['Boolean']>;
  checkedAt?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  tasks?: Maybe<TaskUpdateManyWithoutTodoInput>;
  list?: Maybe<ListUpdateOneWithoutTodosInput>;
  requires?: Maybe<TodoUpdateManyWithoutRequiredByInput>;
  tags?: Maybe<TagUpdateManyWithoutTodosInput>;
};

export type TagUpdateManyWithoutTodosInput = {
  create?: Maybe<Array<TagCreateWithoutTodosInput>>;
  connect?: Maybe<Array<TagWhereUniqueInput>>;
  set?: Maybe<Array<TagWhereUniqueInput>>;
  disconnect?: Maybe<Array<TagWhereUniqueInput>>;
  delete?: Maybe<Array<TagWhereUniqueInput>>;
  update?: Maybe<Array<TagUpdateWithWhereUniqueWithoutTodosInput>>;
  updateMany?: Maybe<Array<TagUpdateManyWithWhereNestedInput>>;
  deleteMany?: Maybe<Array<TagScalarWhereInput>>;
  upsert?: Maybe<Array<TagUpsertWithWhereUniqueWithoutTodosInput>>;
};

export type TagUpdateWithWhereUniqueWithoutTodosInput = {
  where: TagWhereUniqueInput;
  data: TagUpdateWithoutTodosDataInput;
};

export type TagUpdateWithoutTodosDataInput = {
  text?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type TagUpdateManyWithWhereNestedInput = {
  where: TagScalarWhereInput;
  data: TagUpdateManyDataInput;
};

export type TagScalarWhereInput = {
  AND?: Maybe<Array<TagScalarWhereInput>>;
  OR?: Maybe<Array<TagScalarWhereInput>>;
  NOT?: Maybe<Array<TagScalarWhereInput>>;
  id?: Maybe<IntFilter>;
  text?: Maybe<StringFilter>;
  color?: Maybe<StringNullableFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
};

export type TagUpdateManyDataInput = {
  text?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type TagUpsertWithWhereUniqueWithoutTodosInput = {
  where: TagWhereUniqueInput;
  update: TagUpdateWithoutTodosDataInput;
  create: TagCreateWithoutTodosInput;
};

export type TodoUpdateManyWithWhereNestedInput = {
  where: TodoScalarWhereInput;
  data: TodoUpdateManyDataInput;
};

export type TodoScalarWhereInput = {
  AND?: Maybe<Array<TodoScalarWhereInput>>;
  OR?: Maybe<Array<TodoScalarWhereInput>>;
  NOT?: Maybe<Array<TodoScalarWhereInput>>;
  id?: Maybe<IntFilter>;
  title?: Maybe<StringNullableFilter>;
  description?: Maybe<StringNullableFilter>;
  checked?: Maybe<BoolFilter>;
  checkedAt?: Maybe<DateTimeNullableFilter>;
  listId?: Maybe<IntNullableFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
};

export type TodoUpdateManyDataInput = {
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
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  checked?: Maybe<Scalars['Boolean']>;
  checkedAt?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  tasks?: Maybe<TaskUpdateManyWithoutTodoInput>;
  list?: Maybe<ListUpdateOneWithoutTodosInput>;
  requiredBy?: Maybe<TodoUpdateManyWithoutRequiresInput>;
  tags?: Maybe<TagUpdateManyWithoutTodosInput>;
};

export type TodoUpsertWithWhereUniqueWithoutRequiresInput = {
  where: TodoWhereUniqueInput;
  update: TodoUpdateWithoutRequiresDataInput;
  create: TodoCreateWithoutRequiresInput;
};

export type TodoUpsertWithWhereUniqueWithoutTagsInput = {
  where: TodoWhereUniqueInput;
  update: TodoUpdateWithoutTagsDataInput;
  create: TodoCreateWithoutTagsInput;
};

export type TaskCreateInput = {
  title: Scalars['String'];
  checkedAt?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  todo?: Maybe<TodoCreateOneWithoutTasksInput>;
};

export type TodoCreateOneWithoutTasksInput = {
  create?: Maybe<TodoCreateWithoutTasksInput>;
  connect?: Maybe<TodoWhereUniqueInput>;
};

export type TodoCreateWithoutTasksInput = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  checked?: Maybe<Scalars['Boolean']>;
  checkedAt?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  list?: Maybe<ListCreateOneWithoutTodosInput>;
  requires?: Maybe<TodoCreateManyWithoutRequiredByInput>;
  requiredBy?: Maybe<TodoCreateManyWithoutRequiresInput>;
  tags?: Maybe<TagCreateManyWithoutTodosInput>;
};

export type TaskUpdateInput = {
  title?: Maybe<Scalars['String']>;
  checkedAt?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  todo?: Maybe<TodoUpdateOneWithoutTasksInput>;
};

export type TodoUpdateOneWithoutTasksInput = {
  create?: Maybe<TodoCreateWithoutTasksInput>;
  connect?: Maybe<TodoWhereUniqueInput>;
  disconnect?: Maybe<Scalars['Boolean']>;
  delete?: Maybe<Scalars['Boolean']>;
  update?: Maybe<TodoUpdateWithoutTasksDataInput>;
  upsert?: Maybe<TodoUpsertWithoutTasksInput>;
};

export type TodoUpdateWithoutTasksDataInput = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  checked?: Maybe<Scalars['Boolean']>;
  checkedAt?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  list?: Maybe<ListUpdateOneWithoutTodosInput>;
  requires?: Maybe<TodoUpdateManyWithoutRequiredByInput>;
  requiredBy?: Maybe<TodoUpdateManyWithoutRequiresInput>;
  tags?: Maybe<TagUpdateManyWithoutTodosInput>;
};

export type TodoUpsertWithoutTasksInput = {
  update: TodoUpdateWithoutTasksDataInput;
  create: TodoCreateWithoutTasksInput;
};

export type TaskUpdateManyMutationInput = {
  title?: Maybe<Scalars['String']>;
  checkedAt?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type BatchPayload = {
  __typename?: 'BatchPayload';
  count: Scalars['Int'];
};

export type TodoCreateInput = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  checked?: Maybe<Scalars['Boolean']>;
  checkedAt?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  tasks?: Maybe<TaskCreateManyWithoutTodoInput>;
  list?: Maybe<ListCreateOneWithoutTodosInput>;
  requires?: Maybe<TodoCreateManyWithoutRequiredByInput>;
  requiredBy?: Maybe<TodoCreateManyWithoutRequiresInput>;
  tags?: Maybe<TagCreateManyWithoutTodosInput>;
};

export type TodoUpdateInput = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  checked?: Maybe<Scalars['Boolean']>;
  checkedAt?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  tasks?: Maybe<TaskUpdateManyWithoutTodoInput>;
  list?: Maybe<ListUpdateOneWithoutTodosInput>;
  requires?: Maybe<TodoUpdateManyWithoutRequiredByInput>;
  requiredBy?: Maybe<TodoUpdateManyWithoutRequiresInput>;
  tags?: Maybe<TagUpdateManyWithoutTodosInput>;
};

export type TodoUpdateManyMutationInput = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  checked?: Maybe<Scalars['Boolean']>;
  checkedAt?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ListCreateInput = {
  title?: Maybe<Scalars['String']>;
  archivedAt?: Maybe<Scalars['DateTime']>;
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
  tasks?: Maybe<TaskCreateManyWithoutTodoInput>;
  requires?: Maybe<TodoCreateManyWithoutRequiredByInput>;
  requiredBy?: Maybe<TodoCreateManyWithoutRequiresInput>;
  tags?: Maybe<TagCreateManyWithoutTodosInput>;
};

export type ListUpdateInput = {
  title?: Maybe<Scalars['String']>;
  archivedAt?: Maybe<Scalars['DateTime']>;
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
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  checked?: Maybe<Scalars['Boolean']>;
  checkedAt?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  tasks?: Maybe<TaskUpdateManyWithoutTodoInput>;
  requires?: Maybe<TodoUpdateManyWithoutRequiredByInput>;
  requiredBy?: Maybe<TodoUpdateManyWithoutRequiresInput>;
  tags?: Maybe<TagUpdateManyWithoutTodosInput>;
};

export type TodoUpsertWithWhereUniqueWithoutListInput = {
  where: TodoWhereUniqueInput;
  update: TodoUpdateWithoutListDataInput;
  create: TodoCreateWithoutListInput;
};


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
      & { tasks: Array<(
        { __typename?: 'Task' }
        & Pick<Task, 'id' | 'title' | 'checkedAt'>
      )>, tags: Array<(
        { __typename?: 'Tag' }
        & Pick<Tag, 'id' | 'text' | 'color'>
      )> }
    )> }
  )> }
);

export type CreateTagMutationVariables = Exact<{
  text: Scalars['String'];
  color?: Maybe<Scalars['String']>;
}>;


export type CreateTagMutation = (
  { __typename?: 'Mutation' }
  & { createOneTag: (
    { __typename?: 'Tag' }
    & Pick<Tag, 'id' | 'text'>
  ) }
);

export type UpdateTagMutationVariables = Exact<{
  id: Scalars['Int'];
  text?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
}>;


export type UpdateTagMutation = (
  { __typename?: 'Mutation' }
  & { updateOneTag?: Maybe<(
    { __typename?: 'Tag' }
    & Pick<Tag, 'id' | 'text'>
  )> }
);

export type DeleteTagMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteTagMutation = (
  { __typename?: 'Mutation' }
  & { deleteOneTag?: Maybe<(
    { __typename?: 'Tag' }
    & Pick<Tag, 'id'>
  )> }
);

export type TagsQueryVariables = Exact<{ [key: string]: never; }>;


export type TagsQuery = (
  { __typename?: 'Query' }
  & { tags: Array<(
    { __typename?: 'Tag' }
    & Pick<Tag, 'id' | 'text' | 'color'>
    & { todos: Array<(
      { __typename?: 'Todo' }
      & Pick<Todo, 'id'>
    )> }
  )> }
);

export type TodosQueryVariables = Exact<{ [key: string]: never; }>;


export type TodosQuery = (
  { __typename?: 'Query' }
  & { todos: Array<(
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'title' | 'description' | 'checked' | 'createdAt'>
    & { tags: Array<(
      { __typename?: 'Tag' }
      & Pick<Tag, 'id' | 'text' | 'color'>
    )>, list?: Maybe<(
      { __typename?: 'List' }
      & Pick<List, 'id'>
    )>, tasks: Array<(
      { __typename?: 'Task' }
      & Pick<Task, 'id' | 'title' | 'checkedAt'>
    )> }
  )> }
);

export type AddTaskMutationVariables = Exact<{
  todoId: Scalars['Int'];
  title: Scalars['String'];
}>;


export type AddTaskMutation = (
  { __typename?: 'Mutation' }
  & { createOneTask: (
    { __typename?: 'Task' }
    & Pick<Task, 'id' | 'title'>
  ) }
);

export type CheckAllTasksMutationVariables = Exact<{
  todoId?: Maybe<Scalars['Int']>;
  checkedAt?: Maybe<Scalars['DateTime']>;
}>;


export type CheckAllTasksMutation = (
  { __typename?: 'Mutation' }
  & { updateManyTask: (
    { __typename?: 'BatchPayload' }
    & Pick<BatchPayload, 'count'>
  ) }
);

export type TaskQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type TaskQuery = (
  { __typename?: 'Query' }
  & { task?: Maybe<(
    { __typename?: 'Task' }
    & Pick<Task, 'id' | 'title' | 'checkedAt'>
  )> }
);

export type TodoQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type TodoQuery = (
  { __typename?: 'Query' }
  & { todo?: Maybe<(
    { __typename?: 'Todo' }
    & Pick<Todo, 'id'>
    & { tasks: Array<(
      { __typename?: 'Task' }
      & Pick<Task, 'id' | 'title' | 'checkedAt'>
    )> }
  )> }
);

export type CheckTaskMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type CheckTaskMutation = (
  { __typename?: 'Mutation' }
  & { checkTask?: Maybe<(
    { __typename: 'Task' }
    & Pick<Task, 'id' | 'checkedAt'>
  )> }
);

export type DeleteManyTodosMutationVariables = Exact<{
  ids?: Maybe<Array<Scalars['Int']>>;
}>;


export type DeleteManyTodosMutation = (
  { __typename?: 'Mutation' }
  & { deleteManyTodo: (
    { __typename?: 'BatchPayload' }
    & Pick<BatchPayload, 'count'>
  ) }
);

export type RemoveTagFromTodoMutationVariables = Exact<{
  tagId: Scalars['Int'];
  id: Scalars['Int'];
}>;


export type RemoveTagFromTodoMutation = (
  { __typename?: 'Mutation' }
  & { updateOneTodo?: Maybe<(
    { __typename?: 'Todo' }
    & Pick<Todo, 'id'>
    & { tags: Array<(
      { __typename?: 'Tag' }
      & Pick<Tag, 'id'>
    )> }
  )> }
);

export type AddTagToTodoMutationVariables = Exact<{
  tagId: Scalars['Int'];
  id: Scalars['Int'];
}>;


export type AddTagToTodoMutation = (
  { __typename?: 'Mutation' }
  & { updateOneTodo?: Maybe<(
    { __typename?: 'Todo' }
    & Pick<Todo, 'id'>
    & { tags: Array<(
      { __typename?: 'Tag' }
      & Pick<Tag, 'id'>
    )> }
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

export type CreateTodoWithListMutationVariables = Exact<{
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  listId?: Maybe<Scalars['Int']>;
}>;


export type CreateTodoWithListMutation = (
  { __typename?: 'Mutation' }
  & { createOneTodo: (
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'title' | 'description'>
    & { list?: Maybe<(
      { __typename?: 'List' }
      & Pick<List, 'id'>
    )> }
  ) }
);

export type UpdateTodoMutationVariables = Exact<{
  id: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  listId?: Maybe<Scalars['Int']>;
}>;


export type UpdateTodoMutation = (
  { __typename?: 'Mutation' }
  & { updateOneTodo?: Maybe<(
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'title' | 'description'>
  )> }
);

export type RemoveTodoFromListMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RemoveTodoFromListMutation = (
  { __typename?: 'Mutation' }
  & { updateOneTodo?: Maybe<(
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'title' | 'description'>
  )> }
);

export type AddTodosToListMutationVariables = Exact<{
  todos?: Maybe<Array<TodoWhereUniqueInput>>;
  listId: Scalars['Int'];
}>;


export type AddTodosToListMutation = (
  { __typename?: 'Mutation' }
  & { updateOneList?: Maybe<(
    { __typename?: 'List' }
    & Pick<List, 'id'>
    & { todos: Array<(
      { __typename?: 'Todo' }
      & Pick<Todo, 'id'>
      & { list?: Maybe<(
        { __typename?: 'List' }
        & Pick<List, 'id'>
      )> }
    )> }
  )> }
);


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
    todos(orderBy: {id: desc}) {
      id
      title
      description
      checked
      tasks(orderBy: {id: asc}) {
        id
        title
        checkedAt
      }
      tags(orderBy: {id: desc}) {
        id
        text
        color
      }
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
export const CreateTagDocument = gql`
    mutation createTag($text: String!, $color: String) {
  createOneTag(data: {text: $text, color: $color}) {
    id
    text
  }
}
    `;
export type CreateTagMutationFn = Apollo.MutationFunction<CreateTagMutation, CreateTagMutationVariables>;

/**
 * __useCreateTagMutation__
 *
 * To run a mutation, you first call `useCreateTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTagMutation, { data, loading, error }] = useCreateTagMutation({
 *   variables: {
 *      text: // value for 'text'
 *      color: // value for 'color'
 *   },
 * });
 */
export function useCreateTagMutation(baseOptions?: Apollo.MutationHookOptions<CreateTagMutation, CreateTagMutationVariables>) {
        return Apollo.useMutation<CreateTagMutation, CreateTagMutationVariables>(CreateTagDocument, baseOptions);
      }
export type CreateTagMutationHookResult = ReturnType<typeof useCreateTagMutation>;
export type CreateTagMutationResult = Apollo.MutationResult<CreateTagMutation>;
export type CreateTagMutationOptions = Apollo.BaseMutationOptions<CreateTagMutation, CreateTagMutationVariables>;
export const UpdateTagDocument = gql`
    mutation updateTag($id: Int!, $text: String, $color: String) {
  updateOneTag(where: {id: $id}, data: {text: $text, color: $color}) {
    id
    text
  }
}
    `;
export type UpdateTagMutationFn = Apollo.MutationFunction<UpdateTagMutation, UpdateTagMutationVariables>;

/**
 * __useUpdateTagMutation__
 *
 * To run a mutation, you first call `useUpdateTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTagMutation, { data, loading, error }] = useUpdateTagMutation({
 *   variables: {
 *      id: // value for 'id'
 *      text: // value for 'text'
 *      color: // value for 'color'
 *   },
 * });
 */
export function useUpdateTagMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTagMutation, UpdateTagMutationVariables>) {
        return Apollo.useMutation<UpdateTagMutation, UpdateTagMutationVariables>(UpdateTagDocument, baseOptions);
      }
export type UpdateTagMutationHookResult = ReturnType<typeof useUpdateTagMutation>;
export type UpdateTagMutationResult = Apollo.MutationResult<UpdateTagMutation>;
export type UpdateTagMutationOptions = Apollo.BaseMutationOptions<UpdateTagMutation, UpdateTagMutationVariables>;
export const DeleteTagDocument = gql`
    mutation deleteTag($id: Int!) {
  deleteOneTag(where: {id: $id}) {
    id
  }
}
    `;
export type DeleteTagMutationFn = Apollo.MutationFunction<DeleteTagMutation, DeleteTagMutationVariables>;

/**
 * __useDeleteTagMutation__
 *
 * To run a mutation, you first call `useDeleteTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTagMutation, { data, loading, error }] = useDeleteTagMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTagMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTagMutation, DeleteTagMutationVariables>) {
        return Apollo.useMutation<DeleteTagMutation, DeleteTagMutationVariables>(DeleteTagDocument, baseOptions);
      }
export type DeleteTagMutationHookResult = ReturnType<typeof useDeleteTagMutation>;
export type DeleteTagMutationResult = Apollo.MutationResult<DeleteTagMutation>;
export type DeleteTagMutationOptions = Apollo.BaseMutationOptions<DeleteTagMutation, DeleteTagMutationVariables>;
export const TagsDocument = gql`
    query TAGS {
  tags(orderBy: {id: desc}) {
    id
    text
    color
    todos {
      id
    }
  }
}
    `;

/**
 * __useTagsQuery__
 *
 * To run a query within a React component, call `useTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTagsQuery(baseOptions?: Apollo.QueryHookOptions<TagsQuery, TagsQueryVariables>) {
        return Apollo.useQuery<TagsQuery, TagsQueryVariables>(TagsDocument, baseOptions);
      }
export function useTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TagsQuery, TagsQueryVariables>) {
          return Apollo.useLazyQuery<TagsQuery, TagsQueryVariables>(TagsDocument, baseOptions);
        }
export type TagsQueryHookResult = ReturnType<typeof useTagsQuery>;
export type TagsLazyQueryHookResult = ReturnType<typeof useTagsLazyQuery>;
export type TagsQueryResult = Apollo.QueryResult<TagsQuery, TagsQueryVariables>;
export const TodosDocument = gql`
    query TODOS {
  todos(orderBy: {id: desc}) {
    id
    title
    description
    checked
    createdAt
    tags(orderBy: {id: desc}) {
      id
      text
      color
    }
    list {
      id
    }
    tasks(orderBy: {id: asc}) {
      id
      title
      checkedAt
    }
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
export const AddTaskDocument = gql`
    mutation addTask($todoId: Int!, $title: String!) {
  createOneTask(data: {todo: {connect: {id: $todoId}}, title: $title}) {
    id
    title
  }
}
    `;
export type AddTaskMutationFn = Apollo.MutationFunction<AddTaskMutation, AddTaskMutationVariables>;

/**
 * __useAddTaskMutation__
 *
 * To run a mutation, you first call `useAddTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTaskMutation, { data, loading, error }] = useAddTaskMutation({
 *   variables: {
 *      todoId: // value for 'todoId'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useAddTaskMutation(baseOptions?: Apollo.MutationHookOptions<AddTaskMutation, AddTaskMutationVariables>) {
        return Apollo.useMutation<AddTaskMutation, AddTaskMutationVariables>(AddTaskDocument, baseOptions);
      }
export type AddTaskMutationHookResult = ReturnType<typeof useAddTaskMutation>;
export type AddTaskMutationResult = Apollo.MutationResult<AddTaskMutation>;
export type AddTaskMutationOptions = Apollo.BaseMutationOptions<AddTaskMutation, AddTaskMutationVariables>;
export const CheckAllTasksDocument = gql`
    mutation checkAllTasks($todoId: Int, $checkedAt: DateTime) {
  updateManyTask(where: {todoId: {equals: $todoId}}, data: {checkedAt: $checkedAt}) {
    count
  }
}
    `;
export type CheckAllTasksMutationFn = Apollo.MutationFunction<CheckAllTasksMutation, CheckAllTasksMutationVariables>;

/**
 * __useCheckAllTasksMutation__
 *
 * To run a mutation, you first call `useCheckAllTasksMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCheckAllTasksMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [checkAllTasksMutation, { data, loading, error }] = useCheckAllTasksMutation({
 *   variables: {
 *      todoId: // value for 'todoId'
 *      checkedAt: // value for 'checkedAt'
 *   },
 * });
 */
export function useCheckAllTasksMutation(baseOptions?: Apollo.MutationHookOptions<CheckAllTasksMutation, CheckAllTasksMutationVariables>) {
        return Apollo.useMutation<CheckAllTasksMutation, CheckAllTasksMutationVariables>(CheckAllTasksDocument, baseOptions);
      }
export type CheckAllTasksMutationHookResult = ReturnType<typeof useCheckAllTasksMutation>;
export type CheckAllTasksMutationResult = Apollo.MutationResult<CheckAllTasksMutation>;
export type CheckAllTasksMutationOptions = Apollo.BaseMutationOptions<CheckAllTasksMutation, CheckAllTasksMutationVariables>;
export const TaskDocument = gql`
    query TASK($id: Int!) {
  task(where: {id: $id}) {
    id
    title
    checkedAt
  }
}
    `;

/**
 * __useTaskQuery__
 *
 * To run a query within a React component, call `useTaskQuery` and pass it any options that fit your needs.
 * When your component renders, `useTaskQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTaskQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTaskQuery(baseOptions?: Apollo.QueryHookOptions<TaskQuery, TaskQueryVariables>) {
        return Apollo.useQuery<TaskQuery, TaskQueryVariables>(TaskDocument, baseOptions);
      }
export function useTaskLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TaskQuery, TaskQueryVariables>) {
          return Apollo.useLazyQuery<TaskQuery, TaskQueryVariables>(TaskDocument, baseOptions);
        }
export type TaskQueryHookResult = ReturnType<typeof useTaskQuery>;
export type TaskLazyQueryHookResult = ReturnType<typeof useTaskLazyQuery>;
export type TaskQueryResult = Apollo.QueryResult<TaskQuery, TaskQueryVariables>;
export const TodoDocument = gql`
    query TODO($id: Int!) {
  todo(where: {id: $id}) {
    id
    tasks {
      id
      title
      checkedAt
    }
  }
}
    `;

/**
 * __useTodoQuery__
 *
 * To run a query within a React component, call `useTodoQuery` and pass it any options that fit your needs.
 * When your component renders, `useTodoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTodoQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTodoQuery(baseOptions?: Apollo.QueryHookOptions<TodoQuery, TodoQueryVariables>) {
        return Apollo.useQuery<TodoQuery, TodoQueryVariables>(TodoDocument, baseOptions);
      }
export function useTodoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TodoQuery, TodoQueryVariables>) {
          return Apollo.useLazyQuery<TodoQuery, TodoQueryVariables>(TodoDocument, baseOptions);
        }
export type TodoQueryHookResult = ReturnType<typeof useTodoQuery>;
export type TodoLazyQueryHookResult = ReturnType<typeof useTodoLazyQuery>;
export type TodoQueryResult = Apollo.QueryResult<TodoQuery, TodoQueryVariables>;
export const CheckTaskDocument = gql`
    mutation checkTask($id: Int!) {
  checkTask(id: $id) {
    id
    checkedAt
    __typename
  }
}
    `;
export type CheckTaskMutationFn = Apollo.MutationFunction<CheckTaskMutation, CheckTaskMutationVariables>;

/**
 * __useCheckTaskMutation__
 *
 * To run a mutation, you first call `useCheckTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCheckTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [checkTaskMutation, { data, loading, error }] = useCheckTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCheckTaskMutation(baseOptions?: Apollo.MutationHookOptions<CheckTaskMutation, CheckTaskMutationVariables>) {
        return Apollo.useMutation<CheckTaskMutation, CheckTaskMutationVariables>(CheckTaskDocument, baseOptions);
      }
export type CheckTaskMutationHookResult = ReturnType<typeof useCheckTaskMutation>;
export type CheckTaskMutationResult = Apollo.MutationResult<CheckTaskMutation>;
export type CheckTaskMutationOptions = Apollo.BaseMutationOptions<CheckTaskMutation, CheckTaskMutationVariables>;
export const DeleteManyTodosDocument = gql`
    mutation deleteManyTodos($ids: [Int!]) {
  deleteManyTodo(where: {id: {in: $ids}}) {
    count
  }
}
    `;
export type DeleteManyTodosMutationFn = Apollo.MutationFunction<DeleteManyTodosMutation, DeleteManyTodosMutationVariables>;

/**
 * __useDeleteManyTodosMutation__
 *
 * To run a mutation, you first call `useDeleteManyTodosMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteManyTodosMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteManyTodosMutation, { data, loading, error }] = useDeleteManyTodosMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useDeleteManyTodosMutation(baseOptions?: Apollo.MutationHookOptions<DeleteManyTodosMutation, DeleteManyTodosMutationVariables>) {
        return Apollo.useMutation<DeleteManyTodosMutation, DeleteManyTodosMutationVariables>(DeleteManyTodosDocument, baseOptions);
      }
export type DeleteManyTodosMutationHookResult = ReturnType<typeof useDeleteManyTodosMutation>;
export type DeleteManyTodosMutationResult = Apollo.MutationResult<DeleteManyTodosMutation>;
export type DeleteManyTodosMutationOptions = Apollo.BaseMutationOptions<DeleteManyTodosMutation, DeleteManyTodosMutationVariables>;
export const RemoveTagFromTodoDocument = gql`
    mutation removeTagFromTodo($tagId: Int!, $id: Int!) {
  updateOneTodo(where: {id: $id}, data: {tags: {disconnect: {id: $tagId}}}) {
    id
    tags {
      id
    }
  }
}
    `;
export type RemoveTagFromTodoMutationFn = Apollo.MutationFunction<RemoveTagFromTodoMutation, RemoveTagFromTodoMutationVariables>;

/**
 * __useRemoveTagFromTodoMutation__
 *
 * To run a mutation, you first call `useRemoveTagFromTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveTagFromTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeTagFromTodoMutation, { data, loading, error }] = useRemoveTagFromTodoMutation({
 *   variables: {
 *      tagId: // value for 'tagId'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveTagFromTodoMutation(baseOptions?: Apollo.MutationHookOptions<RemoveTagFromTodoMutation, RemoveTagFromTodoMutationVariables>) {
        return Apollo.useMutation<RemoveTagFromTodoMutation, RemoveTagFromTodoMutationVariables>(RemoveTagFromTodoDocument, baseOptions);
      }
export type RemoveTagFromTodoMutationHookResult = ReturnType<typeof useRemoveTagFromTodoMutation>;
export type RemoveTagFromTodoMutationResult = Apollo.MutationResult<RemoveTagFromTodoMutation>;
export type RemoveTagFromTodoMutationOptions = Apollo.BaseMutationOptions<RemoveTagFromTodoMutation, RemoveTagFromTodoMutationVariables>;
export const AddTagToTodoDocument = gql`
    mutation addTagToTodo($tagId: Int!, $id: Int!) {
  updateOneTodo(where: {id: $id}, data: {tags: {connect: {id: $tagId}}}) {
    id
    tags {
      id
    }
  }
}
    `;
export type AddTagToTodoMutationFn = Apollo.MutationFunction<AddTagToTodoMutation, AddTagToTodoMutationVariables>;

/**
 * __useAddTagToTodoMutation__
 *
 * To run a mutation, you first call `useAddTagToTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTagToTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTagToTodoMutation, { data, loading, error }] = useAddTagToTodoMutation({
 *   variables: {
 *      tagId: // value for 'tagId'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAddTagToTodoMutation(baseOptions?: Apollo.MutationHookOptions<AddTagToTodoMutation, AddTagToTodoMutationVariables>) {
        return Apollo.useMutation<AddTagToTodoMutation, AddTagToTodoMutationVariables>(AddTagToTodoDocument, baseOptions);
      }
export type AddTagToTodoMutationHookResult = ReturnType<typeof useAddTagToTodoMutation>;
export type AddTagToTodoMutationResult = Apollo.MutationResult<AddTagToTodoMutation>;
export type AddTagToTodoMutationOptions = Apollo.BaseMutationOptions<AddTagToTodoMutation, AddTagToTodoMutationVariables>;
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
export const CreateTodoWithListDocument = gql`
    mutation createTodoWithList($title: String!, $description: String, $listId: Int) {
  createOneTodo(data: {title: $title, description: $description, list: {connect: {id: $listId}}}) {
    id
    title
    description
    list {
      id
    }
  }
}
    `;
export type CreateTodoWithListMutationFn = Apollo.MutationFunction<CreateTodoWithListMutation, CreateTodoWithListMutationVariables>;

/**
 * __useCreateTodoWithListMutation__
 *
 * To run a mutation, you first call `useCreateTodoWithListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTodoWithListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTodoWithListMutation, { data, loading, error }] = useCreateTodoWithListMutation({
 *   variables: {
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      listId: // value for 'listId'
 *   },
 * });
 */
export function useCreateTodoWithListMutation(baseOptions?: Apollo.MutationHookOptions<CreateTodoWithListMutation, CreateTodoWithListMutationVariables>) {
        return Apollo.useMutation<CreateTodoWithListMutation, CreateTodoWithListMutationVariables>(CreateTodoWithListDocument, baseOptions);
      }
export type CreateTodoWithListMutationHookResult = ReturnType<typeof useCreateTodoWithListMutation>;
export type CreateTodoWithListMutationResult = Apollo.MutationResult<CreateTodoWithListMutation>;
export type CreateTodoWithListMutationOptions = Apollo.BaseMutationOptions<CreateTodoWithListMutation, CreateTodoWithListMutationVariables>;
export const UpdateTodoDocument = gql`
    mutation updateTodo($id: Int!, $title: String, $description: String, $listId: Int) {
  updateOneTodo(where: {id: $id}, data: {title: $title, description: $description, list: {connect: {id: $listId}}}) {
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
 *      listId: // value for 'listId'
 *   },
 * });
 */
export function useUpdateTodoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTodoMutation, UpdateTodoMutationVariables>) {
        return Apollo.useMutation<UpdateTodoMutation, UpdateTodoMutationVariables>(UpdateTodoDocument, baseOptions);
      }
export type UpdateTodoMutationHookResult = ReturnType<typeof useUpdateTodoMutation>;
export type UpdateTodoMutationResult = Apollo.MutationResult<UpdateTodoMutation>;
export type UpdateTodoMutationOptions = Apollo.BaseMutationOptions<UpdateTodoMutation, UpdateTodoMutationVariables>;
export const RemoveTodoFromListDocument = gql`
    mutation removeTodoFromList($id: Int!) {
  updateOneTodo(where: {id: $id}, data: {list: {disconnect: true}}) {
    id
    title
    description
  }
}
    `;
export type RemoveTodoFromListMutationFn = Apollo.MutationFunction<RemoveTodoFromListMutation, RemoveTodoFromListMutationVariables>;

/**
 * __useRemoveTodoFromListMutation__
 *
 * To run a mutation, you first call `useRemoveTodoFromListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveTodoFromListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeTodoFromListMutation, { data, loading, error }] = useRemoveTodoFromListMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveTodoFromListMutation(baseOptions?: Apollo.MutationHookOptions<RemoveTodoFromListMutation, RemoveTodoFromListMutationVariables>) {
        return Apollo.useMutation<RemoveTodoFromListMutation, RemoveTodoFromListMutationVariables>(RemoveTodoFromListDocument, baseOptions);
      }
export type RemoveTodoFromListMutationHookResult = ReturnType<typeof useRemoveTodoFromListMutation>;
export type RemoveTodoFromListMutationResult = Apollo.MutationResult<RemoveTodoFromListMutation>;
export type RemoveTodoFromListMutationOptions = Apollo.BaseMutationOptions<RemoveTodoFromListMutation, RemoveTodoFromListMutationVariables>;
export const AddTodosToListDocument = gql`
    mutation addTodosToList($todos: [TodoWhereUniqueInput!], $listId: Int!) {
  updateOneList(where: {id: $listId}, data: {todos: {connect: $todos}}) {
    id
    todos {
      id
      list {
        id
      }
    }
  }
}
    `;
export type AddTodosToListMutationFn = Apollo.MutationFunction<AddTodosToListMutation, AddTodosToListMutationVariables>;

/**
 * __useAddTodosToListMutation__
 *
 * To run a mutation, you first call `useAddTodosToListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTodosToListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTodosToListMutation, { data, loading, error }] = useAddTodosToListMutation({
 *   variables: {
 *      todos: // value for 'todos'
 *      listId: // value for 'listId'
 *   },
 * });
 */
export function useAddTodosToListMutation(baseOptions?: Apollo.MutationHookOptions<AddTodosToListMutation, AddTodosToListMutationVariables>) {
        return Apollo.useMutation<AddTodosToListMutation, AddTodosToListMutationVariables>(AddTodosToListDocument, baseOptions);
      }
export type AddTodosToListMutationHookResult = ReturnType<typeof useAddTodosToListMutation>;
export type AddTodosToListMutationResult = Apollo.MutationResult<AddTodosToListMutation>;
export type AddTodosToListMutationOptions = Apollo.BaseMutationOptions<AddTodosToListMutation, AddTodosToListMutationVariables>;

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
    