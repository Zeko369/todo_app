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
  user?: Maybe<User>;
  users: Array<User>;
  todo?: Maybe<Todo>;
  todos: Array<Todo>;
  list?: Maybe<List>;
  lists: Array<List>;
  tag?: Maybe<Tag>;
  tags: Array<Tag>;
  comment?: Maybe<Comment>;
  me?: Maybe<User>;
};


export type QueryTaskArgs = {
  where: TaskWhereUniqueInput;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryUsersArgs = {
  where?: Maybe<UserWhereInput>;
  orderBy?: Maybe<Array<UserOrderByInput>>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<UserWhereUniqueInput>;
  after?: Maybe<UserWhereUniqueInput>;
};


export type QueryTodoArgs = {
  where: TodoWhereUniqueInput;
};


export type QueryTodosArgs = {
  where?: Maybe<TodoWhereInput>;
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


export type QueryCommentArgs = {
  where: CommentWhereUniqueInput;
};

export type TaskWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
};

export type Task = {
  __typename?: 'Task';
  id: Scalars['Int'];
  title: Scalars['String'];
  todo: Todo;
  checkedAt?: Maybe<Scalars['DateTime']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Todo = {
  __typename?: 'Todo';
  id: Scalars['Int'];
  pinned: Scalars['Boolean'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  list?: Maybe<List>;
  comments: Array<Comment>;
  commentsCount?: Maybe<Scalars['Int']>;
  tags: Array<Tag>;
  tasks: Array<Task>;
  checked: Scalars['Boolean'];
  checkedAt?: Maybe<Scalars['DateTime']>;
  type: Type;
  requires: Array<Todo>;
  requiredBy: Array<Todo>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};


export type TodoCommentsArgs = {
  where?: Maybe<CommentWhereInput>;
  orderBy?: Maybe<Array<CommentOrderByInput>>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<CommentWhereUniqueInput>;
  after?: Maybe<CommentWhereUniqueInput>;
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
  sharedWith: Array<User>;
  user?: Maybe<User>;
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


export type ListSharedWithArgs = {
  where?: Maybe<UserWhereInput>;
  orderBy?: Maybe<Array<UserOrderByInput>>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<UserWhereUniqueInput>;
  after?: Maybe<UserWhereUniqueInput>;
};

export type TodoOrderByInput = {
  id?: Maybe<SortOrder>;
  pinned?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  description?: Maybe<SortOrder>;
  checked?: Maybe<SortOrder>;
  checkedAt?: Maybe<SortOrder>;
  listId?: Maybe<SortOrder>;
  type?: Maybe<SortOrder>;
  userId?: Maybe<SortOrder>;
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

export type UserWhereInput = {
  AND?: Maybe<Array<UserWhereInput>>;
  OR?: Maybe<Array<UserWhereInput>>;
  NOT?: Maybe<Array<UserWhereInput>>;
  id?: Maybe<IntFilter>;
  username?: Maybe<StringFilter>;
  email?: Maybe<StringFilter>;
  password?: Maybe<StringFilter>;
  todos?: Maybe<TodoListRelationFilter>;
  tasks?: Maybe<TaskListRelationFilter>;
  lists?: Maybe<ListListRelationFilter>;
  tags?: Maybe<TagListRelationFilter>;
  comments?: Maybe<CommentListRelationFilter>;
  sharedLists?: Maybe<ListListRelationFilter>;
  role?: Maybe<Role>;
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
  pinned?: Maybe<BoolFilter>;
  title?: Maybe<StringNullableFilter>;
  description?: Maybe<StringNullableFilter>;
  checked?: Maybe<BoolFilter>;
  checkedAt?: Maybe<DateTimeNullableFilter>;
  tasks?: Maybe<TaskListRelationFilter>;
  list?: Maybe<ListWhereInput>;
  listId?: Maybe<IntNullableFilter>;
  comments?: Maybe<CommentListRelationFilter>;
  type?: Maybe<Type>;
  requires?: Maybe<TodoListRelationFilter>;
  requiredBy?: Maybe<TodoListRelationFilter>;
  tags?: Maybe<TagListRelationFilter>;
  user?: Maybe<UserWhereInput>;
  userId?: Maybe<IntNullableFilter>;
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
  todoId?: Maybe<IntFilter>;
  title?: Maybe<StringFilter>;
  user?: Maybe<UserWhereInput>;
  userId?: Maybe<IntNullableFilter>;
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
  user?: Maybe<UserWhereInput>;
  sharedWith?: Maybe<UserListRelationFilter>;
  userId?: Maybe<IntNullableFilter>;
  archivedAt?: Maybe<DateTimeNullableFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
};

export type UserListRelationFilter = {
  every?: Maybe<UserWhereInput>;
  some?: Maybe<UserWhereInput>;
  none?: Maybe<UserWhereInput>;
};

export type CommentListRelationFilter = {
  every?: Maybe<CommentWhereInput>;
  some?: Maybe<CommentWhereInput>;
  none?: Maybe<CommentWhereInput>;
};

export type CommentWhereInput = {
  AND?: Maybe<Array<CommentWhereInput>>;
  OR?: Maybe<Array<CommentWhereInput>>;
  NOT?: Maybe<Array<CommentWhereInput>>;
  id?: Maybe<IntFilter>;
  title?: Maybe<StringFilter>;
  content?: Maybe<StringNullableFilter>;
  user?: Maybe<UserWhereInput>;
  userId?: Maybe<IntFilter>;
  todo?: Maybe<TodoWhereInput>;
  todoId?: Maybe<IntFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
};

export enum Type {
  Note = 'NOTE',
  Todo = 'TODO',
  Reminder = 'REMINDER'
}

export type TagListRelationFilter = {
  every?: Maybe<TagWhereInput>;
  some?: Maybe<TagWhereInput>;
  none?: Maybe<TagWhereInput>;
};

export type TagWhereInput = {
  AND?: Maybe<Array<TagWhereInput>>;
  OR?: Maybe<Array<TagWhereInput>>;
  NOT?: Maybe<Array<TagWhereInput>>;
  id?: Maybe<IntFilter>;
  text?: Maybe<StringFilter>;
  color?: Maybe<StringNullableFilter>;
  todos?: Maybe<TodoListRelationFilter>;
  user?: Maybe<UserWhereInput>;
  userId?: Maybe<IntNullableFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
};

export type ListListRelationFilter = {
  every?: Maybe<ListWhereInput>;
  some?: Maybe<ListWhereInput>;
  none?: Maybe<ListWhereInput>;
};

export enum Role {
  User = 'USER',
  Admin = 'ADMIN'
}

export type UserOrderByInput = {
  id?: Maybe<SortOrder>;
  username?: Maybe<SortOrder>;
  email?: Maybe<SortOrder>;
  password?: Maybe<SortOrder>;
  role?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
};

export type UserWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  role: Role;
  tags: Array<Tag>;
  todos: Array<Todo>;
  tasks: Array<Task>;
  lists: Array<List>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};


export type UserTagsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<TagWhereUniqueInput>;
  after?: Maybe<TagWhereUniqueInput>;
};


export type UserTodosArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<TodoWhereUniqueInput>;
  after?: Maybe<TodoWhereUniqueInput>;
};


export type UserTasksArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<TaskWhereUniqueInput>;
  after?: Maybe<TaskWhereUniqueInput>;
};


export type UserListsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<ListWhereUniqueInput>;
  after?: Maybe<ListWhereUniqueInput>;
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

export type ListWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
};

export type CommentOrderByInput = {
  id?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  content?: Maybe<SortOrder>;
  userId?: Maybe<SortOrder>;
  todoId?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
};

export type CommentWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['Int'];
  title: Scalars['String'];
  content?: Maybe<Scalars['String']>;
  user: User;
  todo: Todo;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type TagOrderByInput = {
  id?: Maybe<SortOrder>;
  text?: Maybe<SortOrder>;
  color?: Maybe<SortOrder>;
  userId?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
};

export type TaskOrderByInput = {
  id?: Maybe<SortOrder>;
  todoId?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  userId?: Maybe<SortOrder>;
  checkedAt?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
};

export type ListOrderByInput = {
  id?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  userId?: Maybe<SortOrder>;
  archivedAt?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<AuthPayload>;
  register?: Maybe<AuthPayload>;
  createOneComment: Comment;
  updateOneComment?: Maybe<Comment>;
  deleteOneComment?: Maybe<Comment>;
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


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationCreateOneCommentArgs = {
  data: CommentCreateInput;
};


export type MutationUpdateOneCommentArgs = {
  data: CommentUpdateInput;
  where: CommentWhereUniqueInput;
};


export type MutationDeleteOneCommentArgs = {
  where: CommentWhereUniqueInput;
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

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type CommentCreateInput = {
  title: Scalars['String'];
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: UserCreateOneWithoutCommentsInput;
  todo: TodoCreateOneWithoutCommentsInput;
};

export type UserCreateOneWithoutCommentsInput = {
  create?: Maybe<UserCreateWithoutCommentsInput>;
  connect?: Maybe<UserWhereUniqueInput>;
};

export type UserCreateWithoutCommentsInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  role?: Maybe<Role>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  todos?: Maybe<TodoCreateManyWithoutUserInput>;
  tasks?: Maybe<TaskCreateManyWithoutUserInput>;
  lists?: Maybe<ListCreateManyWithoutUserInput>;
  tags?: Maybe<TagCreateManyWithoutUserInput>;
  sharedLists?: Maybe<ListCreateManyWithoutSharedWithInput>;
};

export type TodoCreateManyWithoutUserInput = {
  create?: Maybe<Array<TodoCreateWithoutUserInput>>;
  connect?: Maybe<Array<TodoWhereUniqueInput>>;
};

export type TodoCreateWithoutUserInput = {
  pinned?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  checked?: Maybe<Scalars['Boolean']>;
  checkedAt?: Maybe<Scalars['DateTime']>;
  type?: Maybe<Type>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  tasks?: Maybe<TaskCreateManyWithoutTodoInput>;
  list?: Maybe<ListCreateOneWithoutTodosInput>;
  comments?: Maybe<CommentCreateManyWithoutTodoInput>;
  requires?: Maybe<TodoCreateManyWithoutRequiredByInput>;
  requiredBy?: Maybe<TodoCreateManyWithoutRequiresInput>;
  tags?: Maybe<TagCreateManyWithoutTodosInput>;
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
  user?: Maybe<UserCreateOneWithoutTasksInput>;
};

export type UserCreateOneWithoutTasksInput = {
  create?: Maybe<UserCreateWithoutTasksInput>;
  connect?: Maybe<UserWhereUniqueInput>;
};

export type UserCreateWithoutTasksInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  role?: Maybe<Role>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  todos?: Maybe<TodoCreateManyWithoutUserInput>;
  lists?: Maybe<ListCreateManyWithoutUserInput>;
  tags?: Maybe<TagCreateManyWithoutUserInput>;
  comments?: Maybe<CommentCreateManyWithoutUserInput>;
  sharedLists?: Maybe<ListCreateManyWithoutSharedWithInput>;
};

export type ListCreateManyWithoutUserInput = {
  create?: Maybe<Array<ListCreateWithoutUserInput>>;
  connect?: Maybe<Array<ListWhereUniqueInput>>;
};

export type ListCreateWithoutUserInput = {
  title?: Maybe<Scalars['String']>;
  archivedAt?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  todos?: Maybe<TodoCreateManyWithoutListInput>;
  sharedWith?: Maybe<UserCreateManyWithoutSharedListsInput>;
};

export type TodoCreateManyWithoutListInput = {
  create?: Maybe<Array<TodoCreateWithoutListInput>>;
  connect?: Maybe<Array<TodoWhereUniqueInput>>;
};

export type TodoCreateWithoutListInput = {
  pinned?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  checked?: Maybe<Scalars['Boolean']>;
  checkedAt?: Maybe<Scalars['DateTime']>;
  type?: Maybe<Type>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  tasks?: Maybe<TaskCreateManyWithoutTodoInput>;
  comments?: Maybe<CommentCreateManyWithoutTodoInput>;
  requires?: Maybe<TodoCreateManyWithoutRequiredByInput>;
  requiredBy?: Maybe<TodoCreateManyWithoutRequiresInput>;
  tags?: Maybe<TagCreateManyWithoutTodosInput>;
  user?: Maybe<UserCreateOneWithoutTodosInput>;
};

export type CommentCreateManyWithoutTodoInput = {
  create?: Maybe<Array<CommentCreateWithoutTodoInput>>;
  connect?: Maybe<Array<CommentWhereUniqueInput>>;
};

export type CommentCreateWithoutTodoInput = {
  title: Scalars['String'];
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: UserCreateOneWithoutCommentsInput;
};

export type TodoCreateManyWithoutRequiredByInput = {
  create?: Maybe<Array<TodoCreateWithoutRequiredByInput>>;
  connect?: Maybe<Array<TodoWhereUniqueInput>>;
};

export type TodoCreateWithoutRequiredByInput = {
  pinned?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  checked?: Maybe<Scalars['Boolean']>;
  checkedAt?: Maybe<Scalars['DateTime']>;
  type?: Maybe<Type>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  tasks?: Maybe<TaskCreateManyWithoutTodoInput>;
  list?: Maybe<ListCreateOneWithoutTodosInput>;
  comments?: Maybe<CommentCreateManyWithoutTodoInput>;
  requires?: Maybe<TodoCreateManyWithoutRequiredByInput>;
  tags?: Maybe<TagCreateManyWithoutTodosInput>;
  user?: Maybe<UserCreateOneWithoutTodosInput>;
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
  user?: Maybe<UserCreateOneWithoutListsInput>;
  sharedWith?: Maybe<UserCreateManyWithoutSharedListsInput>;
};

export type UserCreateOneWithoutListsInput = {
  create?: Maybe<UserCreateWithoutListsInput>;
  connect?: Maybe<UserWhereUniqueInput>;
};

export type UserCreateWithoutListsInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  role?: Maybe<Role>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  todos?: Maybe<TodoCreateManyWithoutUserInput>;
  tasks?: Maybe<TaskCreateManyWithoutUserInput>;
  tags?: Maybe<TagCreateManyWithoutUserInput>;
  comments?: Maybe<CommentCreateManyWithoutUserInput>;
  sharedLists?: Maybe<ListCreateManyWithoutSharedWithInput>;
};

export type TaskCreateManyWithoutUserInput = {
  create?: Maybe<Array<TaskCreateWithoutUserInput>>;
  connect?: Maybe<Array<TaskWhereUniqueInput>>;
};

export type TaskCreateWithoutUserInput = {
  title: Scalars['String'];
  checkedAt?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  todo: TodoCreateOneWithoutTasksInput;
};

export type TodoCreateOneWithoutTasksInput = {
  create?: Maybe<TodoCreateWithoutTasksInput>;
  connect?: Maybe<TodoWhereUniqueInput>;
};

export type TodoCreateWithoutTasksInput = {
  pinned?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  checked?: Maybe<Scalars['Boolean']>;
  checkedAt?: Maybe<Scalars['DateTime']>;
  type?: Maybe<Type>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  list?: Maybe<ListCreateOneWithoutTodosInput>;
  comments?: Maybe<CommentCreateManyWithoutTodoInput>;
  requires?: Maybe<TodoCreateManyWithoutRequiredByInput>;
  requiredBy?: Maybe<TodoCreateManyWithoutRequiresInput>;
  tags?: Maybe<TagCreateManyWithoutTodosInput>;
  user?: Maybe<UserCreateOneWithoutTodosInput>;
};

export type TodoCreateManyWithoutRequiresInput = {
  create?: Maybe<Array<TodoCreateWithoutRequiresInput>>;
  connect?: Maybe<Array<TodoWhereUniqueInput>>;
};

export type TodoCreateWithoutRequiresInput = {
  pinned?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  checked?: Maybe<Scalars['Boolean']>;
  checkedAt?: Maybe<Scalars['DateTime']>;
  type?: Maybe<Type>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  tasks?: Maybe<TaskCreateManyWithoutTodoInput>;
  list?: Maybe<ListCreateOneWithoutTodosInput>;
  comments?: Maybe<CommentCreateManyWithoutTodoInput>;
  requiredBy?: Maybe<TodoCreateManyWithoutRequiresInput>;
  tags?: Maybe<TagCreateManyWithoutTodosInput>;
  user?: Maybe<UserCreateOneWithoutTodosInput>;
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
  user?: Maybe<UserCreateOneWithoutTagsInput>;
};

export type UserCreateOneWithoutTagsInput = {
  create?: Maybe<UserCreateWithoutTagsInput>;
  connect?: Maybe<UserWhereUniqueInput>;
};

export type UserCreateWithoutTagsInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  role?: Maybe<Role>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  todos?: Maybe<TodoCreateManyWithoutUserInput>;
  tasks?: Maybe<TaskCreateManyWithoutUserInput>;
  lists?: Maybe<ListCreateManyWithoutUserInput>;
  comments?: Maybe<CommentCreateManyWithoutUserInput>;
  sharedLists?: Maybe<ListCreateManyWithoutSharedWithInput>;
};

export type CommentCreateManyWithoutUserInput = {
  create?: Maybe<Array<CommentCreateWithoutUserInput>>;
  connect?: Maybe<Array<CommentWhereUniqueInput>>;
};

export type CommentCreateWithoutUserInput = {
  title: Scalars['String'];
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  todo: TodoCreateOneWithoutCommentsInput;
};

export type TodoCreateOneWithoutCommentsInput = {
  create?: Maybe<TodoCreateWithoutCommentsInput>;
  connect?: Maybe<TodoWhereUniqueInput>;
};

export type TodoCreateWithoutCommentsInput = {
  pinned?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  checked?: Maybe<Scalars['Boolean']>;
  checkedAt?: Maybe<Scalars['DateTime']>;
  type?: Maybe<Type>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  tasks?: Maybe<TaskCreateManyWithoutTodoInput>;
  list?: Maybe<ListCreateOneWithoutTodosInput>;
  requires?: Maybe<TodoCreateManyWithoutRequiredByInput>;
  requiredBy?: Maybe<TodoCreateManyWithoutRequiresInput>;
  tags?: Maybe<TagCreateManyWithoutTodosInput>;
  user?: Maybe<UserCreateOneWithoutTodosInput>;
};

export type UserCreateOneWithoutTodosInput = {
  create?: Maybe<UserCreateWithoutTodosInput>;
  connect?: Maybe<UserWhereUniqueInput>;
};

export type UserCreateWithoutTodosInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  role?: Maybe<Role>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  tasks?: Maybe<TaskCreateManyWithoutUserInput>;
  lists?: Maybe<ListCreateManyWithoutUserInput>;
  tags?: Maybe<TagCreateManyWithoutUserInput>;
  comments?: Maybe<CommentCreateManyWithoutUserInput>;
  sharedLists?: Maybe<ListCreateManyWithoutSharedWithInput>;
};

export type TagCreateManyWithoutUserInput = {
  create?: Maybe<Array<TagCreateWithoutUserInput>>;
  connect?: Maybe<Array<TagWhereUniqueInput>>;
};

export type TagCreateWithoutUserInput = {
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
  pinned?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  checked?: Maybe<Scalars['Boolean']>;
  checkedAt?: Maybe<Scalars['DateTime']>;
  type?: Maybe<Type>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  tasks?: Maybe<TaskCreateManyWithoutTodoInput>;
  list?: Maybe<ListCreateOneWithoutTodosInput>;
  comments?: Maybe<CommentCreateManyWithoutTodoInput>;
  requires?: Maybe<TodoCreateManyWithoutRequiredByInput>;
  requiredBy?: Maybe<TodoCreateManyWithoutRequiresInput>;
  user?: Maybe<UserCreateOneWithoutTodosInput>;
};

export type ListCreateManyWithoutSharedWithInput = {
  create?: Maybe<Array<ListCreateWithoutSharedWithInput>>;
  connect?: Maybe<Array<ListWhereUniqueInput>>;
};

export type ListCreateWithoutSharedWithInput = {
  title?: Maybe<Scalars['String']>;
  archivedAt?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  todos?: Maybe<TodoCreateManyWithoutListInput>;
  user?: Maybe<UserCreateOneWithoutListsInput>;
};

export type UserCreateManyWithoutSharedListsInput = {
  create?: Maybe<Array<UserCreateWithoutSharedListsInput>>;
  connect?: Maybe<Array<UserWhereUniqueInput>>;
};

export type UserCreateWithoutSharedListsInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  role?: Maybe<Role>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  todos?: Maybe<TodoCreateManyWithoutUserInput>;
  tasks?: Maybe<TaskCreateManyWithoutUserInput>;
  lists?: Maybe<ListCreateManyWithoutUserInput>;
  tags?: Maybe<TagCreateManyWithoutUserInput>;
  comments?: Maybe<CommentCreateManyWithoutUserInput>;
};

export type CommentUpdateInput = {
  title?: Maybe<StringFieldUpdateOperationsInput>;
  content?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  user?: Maybe<UserUpdateOneRequiredWithoutCommentsInput>;
  todo?: Maybe<TodoUpdateOneRequiredWithoutCommentsInput>;
};

export type StringFieldUpdateOperationsInput = {
  set?: Maybe<Scalars['String']>;
};

export type NullableStringFieldUpdateOperationsInput = {
  set?: Maybe<Scalars['String']>;
};

export type DateTimeFieldUpdateOperationsInput = {
  set?: Maybe<Scalars['DateTime']>;
};

export type UserUpdateOneRequiredWithoutCommentsInput = {
  create?: Maybe<UserCreateWithoutCommentsInput>;
  connect?: Maybe<UserWhereUniqueInput>;
  update?: Maybe<UserUpdateWithoutCommentsDataInput>;
  upsert?: Maybe<UserUpsertWithoutCommentsInput>;
};

export type UserUpdateWithoutCommentsDataInput = {
  username?: Maybe<StringFieldUpdateOperationsInput>;
  email?: Maybe<StringFieldUpdateOperationsInput>;
  password?: Maybe<StringFieldUpdateOperationsInput>;
  role?: Maybe<Role>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  todos?: Maybe<TodoUpdateManyWithoutUserInput>;
  tasks?: Maybe<TaskUpdateManyWithoutUserInput>;
  lists?: Maybe<ListUpdateManyWithoutUserInput>;
  tags?: Maybe<TagUpdateManyWithoutUserInput>;
  sharedLists?: Maybe<ListUpdateManyWithoutSharedWithInput>;
};

export type TodoUpdateManyWithoutUserInput = {
  create?: Maybe<Array<TodoCreateWithoutUserInput>>;
  connect?: Maybe<Array<TodoWhereUniqueInput>>;
  set?: Maybe<Array<TodoWhereUniqueInput>>;
  disconnect?: Maybe<Array<TodoWhereUniqueInput>>;
  delete?: Maybe<Array<TodoWhereUniqueInput>>;
  update?: Maybe<Array<TodoUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: Maybe<Array<TodoUpdateManyWithWhereNestedInput>>;
  deleteMany?: Maybe<Array<TodoScalarWhereInput>>;
  upsert?: Maybe<Array<TodoUpsertWithWhereUniqueWithoutUserInput>>;
};

export type TodoUpdateWithWhereUniqueWithoutUserInput = {
  where: TodoWhereUniqueInput;
  data: TodoUpdateWithoutUserDataInput;
};

export type TodoUpdateWithoutUserDataInput = {
  pinned?: Maybe<BoolFieldUpdateOperationsInput>;
  title?: Maybe<NullableStringFieldUpdateOperationsInput>;
  description?: Maybe<NullableStringFieldUpdateOperationsInput>;
  checked?: Maybe<BoolFieldUpdateOperationsInput>;
  checkedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  type?: Maybe<Type>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  tasks?: Maybe<TaskUpdateManyWithoutTodoInput>;
  list?: Maybe<ListUpdateOneWithoutTodosInput>;
  comments?: Maybe<CommentUpdateManyWithoutTodoInput>;
  requires?: Maybe<TodoUpdateManyWithoutRequiredByInput>;
  requiredBy?: Maybe<TodoUpdateManyWithoutRequiresInput>;
  tags?: Maybe<TagUpdateManyWithoutTodosInput>;
};

export type BoolFieldUpdateOperationsInput = {
  set?: Maybe<Scalars['Boolean']>;
};

export type NullableDateTimeFieldUpdateOperationsInput = {
  set?: Maybe<Scalars['DateTime']>;
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
  title?: Maybe<StringFieldUpdateOperationsInput>;
  checkedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  user?: Maybe<UserUpdateOneWithoutTasksInput>;
};

export type UserUpdateOneWithoutTasksInput = {
  create?: Maybe<UserCreateWithoutTasksInput>;
  connect?: Maybe<UserWhereUniqueInput>;
  disconnect?: Maybe<Scalars['Boolean']>;
  delete?: Maybe<Scalars['Boolean']>;
  update?: Maybe<UserUpdateWithoutTasksDataInput>;
  upsert?: Maybe<UserUpsertWithoutTasksInput>;
};

export type UserUpdateWithoutTasksDataInput = {
  username?: Maybe<StringFieldUpdateOperationsInput>;
  email?: Maybe<StringFieldUpdateOperationsInput>;
  password?: Maybe<StringFieldUpdateOperationsInput>;
  role?: Maybe<Role>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  todos?: Maybe<TodoUpdateManyWithoutUserInput>;
  lists?: Maybe<ListUpdateManyWithoutUserInput>;
  tags?: Maybe<TagUpdateManyWithoutUserInput>;
  comments?: Maybe<CommentUpdateManyWithoutUserInput>;
  sharedLists?: Maybe<ListUpdateManyWithoutSharedWithInput>;
};

export type ListUpdateManyWithoutUserInput = {
  create?: Maybe<Array<ListCreateWithoutUserInput>>;
  connect?: Maybe<Array<ListWhereUniqueInput>>;
  set?: Maybe<Array<ListWhereUniqueInput>>;
  disconnect?: Maybe<Array<ListWhereUniqueInput>>;
  delete?: Maybe<Array<ListWhereUniqueInput>>;
  update?: Maybe<Array<ListUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: Maybe<Array<ListUpdateManyWithWhereNestedInput>>;
  deleteMany?: Maybe<Array<ListScalarWhereInput>>;
  upsert?: Maybe<Array<ListUpsertWithWhereUniqueWithoutUserInput>>;
};

export type ListUpdateWithWhereUniqueWithoutUserInput = {
  where: ListWhereUniqueInput;
  data: ListUpdateWithoutUserDataInput;
};

export type ListUpdateWithoutUserDataInput = {
  title?: Maybe<NullableStringFieldUpdateOperationsInput>;
  archivedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  todos?: Maybe<TodoUpdateManyWithoutListInput>;
  sharedWith?: Maybe<UserUpdateManyWithoutSharedListsInput>;
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
  pinned?: Maybe<BoolFieldUpdateOperationsInput>;
  title?: Maybe<NullableStringFieldUpdateOperationsInput>;
  description?: Maybe<NullableStringFieldUpdateOperationsInput>;
  checked?: Maybe<BoolFieldUpdateOperationsInput>;
  checkedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  type?: Maybe<Type>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  tasks?: Maybe<TaskUpdateManyWithoutTodoInput>;
  comments?: Maybe<CommentUpdateManyWithoutTodoInput>;
  requires?: Maybe<TodoUpdateManyWithoutRequiredByInput>;
  requiredBy?: Maybe<TodoUpdateManyWithoutRequiresInput>;
  tags?: Maybe<TagUpdateManyWithoutTodosInput>;
  user?: Maybe<UserUpdateOneWithoutTodosInput>;
};

export type CommentUpdateManyWithoutTodoInput = {
  create?: Maybe<Array<CommentCreateWithoutTodoInput>>;
  connect?: Maybe<Array<CommentWhereUniqueInput>>;
  set?: Maybe<Array<CommentWhereUniqueInput>>;
  disconnect?: Maybe<Array<CommentWhereUniqueInput>>;
  delete?: Maybe<Array<CommentWhereUniqueInput>>;
  update?: Maybe<Array<CommentUpdateWithWhereUniqueWithoutTodoInput>>;
  updateMany?: Maybe<Array<CommentUpdateManyWithWhereNestedInput>>;
  deleteMany?: Maybe<Array<CommentScalarWhereInput>>;
  upsert?: Maybe<Array<CommentUpsertWithWhereUniqueWithoutTodoInput>>;
};

export type CommentUpdateWithWhereUniqueWithoutTodoInput = {
  where: CommentWhereUniqueInput;
  data: CommentUpdateWithoutTodoDataInput;
};

export type CommentUpdateWithoutTodoDataInput = {
  title?: Maybe<StringFieldUpdateOperationsInput>;
  content?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  user?: Maybe<UserUpdateOneRequiredWithoutCommentsInput>;
};

export type CommentUpdateManyWithWhereNestedInput = {
  where: CommentScalarWhereInput;
  data: CommentUpdateManyDataInput;
};

export type CommentScalarWhereInput = {
  AND?: Maybe<Array<CommentScalarWhereInput>>;
  OR?: Maybe<Array<CommentScalarWhereInput>>;
  NOT?: Maybe<Array<CommentScalarWhereInput>>;
  id?: Maybe<IntFilter>;
  title?: Maybe<StringFilter>;
  content?: Maybe<StringNullableFilter>;
  userId?: Maybe<IntFilter>;
  todoId?: Maybe<IntFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
};

export type CommentUpdateManyDataInput = {
  title?: Maybe<StringFieldUpdateOperationsInput>;
  content?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};

export type CommentUpsertWithWhereUniqueWithoutTodoInput = {
  where: CommentWhereUniqueInput;
  update: CommentUpdateWithoutTodoDataInput;
  create: CommentCreateWithoutTodoInput;
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
  pinned?: Maybe<BoolFieldUpdateOperationsInput>;
  title?: Maybe<NullableStringFieldUpdateOperationsInput>;
  description?: Maybe<NullableStringFieldUpdateOperationsInput>;
  checked?: Maybe<BoolFieldUpdateOperationsInput>;
  checkedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  type?: Maybe<Type>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  tasks?: Maybe<TaskUpdateManyWithoutTodoInput>;
  list?: Maybe<ListUpdateOneWithoutTodosInput>;
  comments?: Maybe<CommentUpdateManyWithoutTodoInput>;
  requires?: Maybe<TodoUpdateManyWithoutRequiredByInput>;
  tags?: Maybe<TagUpdateManyWithoutTodosInput>;
  user?: Maybe<UserUpdateOneWithoutTodosInput>;
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
  title?: Maybe<NullableStringFieldUpdateOperationsInput>;
  archivedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  user?: Maybe<UserUpdateOneWithoutListsInput>;
  sharedWith?: Maybe<UserUpdateManyWithoutSharedListsInput>;
};

export type UserUpdateOneWithoutListsInput = {
  create?: Maybe<UserCreateWithoutListsInput>;
  connect?: Maybe<UserWhereUniqueInput>;
  disconnect?: Maybe<Scalars['Boolean']>;
  delete?: Maybe<Scalars['Boolean']>;
  update?: Maybe<UserUpdateWithoutListsDataInput>;
  upsert?: Maybe<UserUpsertWithoutListsInput>;
};

export type UserUpdateWithoutListsDataInput = {
  username?: Maybe<StringFieldUpdateOperationsInput>;
  email?: Maybe<StringFieldUpdateOperationsInput>;
  password?: Maybe<StringFieldUpdateOperationsInput>;
  role?: Maybe<Role>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  todos?: Maybe<TodoUpdateManyWithoutUserInput>;
  tasks?: Maybe<TaskUpdateManyWithoutUserInput>;
  tags?: Maybe<TagUpdateManyWithoutUserInput>;
  comments?: Maybe<CommentUpdateManyWithoutUserInput>;
  sharedLists?: Maybe<ListUpdateManyWithoutSharedWithInput>;
};

export type TaskUpdateManyWithoutUserInput = {
  create?: Maybe<Array<TaskCreateWithoutUserInput>>;
  connect?: Maybe<Array<TaskWhereUniqueInput>>;
  set?: Maybe<Array<TaskWhereUniqueInput>>;
  disconnect?: Maybe<Array<TaskWhereUniqueInput>>;
  delete?: Maybe<Array<TaskWhereUniqueInput>>;
  update?: Maybe<Array<TaskUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: Maybe<Array<TaskUpdateManyWithWhereNestedInput>>;
  deleteMany?: Maybe<Array<TaskScalarWhereInput>>;
  upsert?: Maybe<Array<TaskUpsertWithWhereUniqueWithoutUserInput>>;
};

export type TaskUpdateWithWhereUniqueWithoutUserInput = {
  where: TaskWhereUniqueInput;
  data: TaskUpdateWithoutUserDataInput;
};

export type TaskUpdateWithoutUserDataInput = {
  title?: Maybe<StringFieldUpdateOperationsInput>;
  checkedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  todo?: Maybe<TodoUpdateOneRequiredWithoutTasksInput>;
};

export type TodoUpdateOneRequiredWithoutTasksInput = {
  create?: Maybe<TodoCreateWithoutTasksInput>;
  connect?: Maybe<TodoWhereUniqueInput>;
  update?: Maybe<TodoUpdateWithoutTasksDataInput>;
  upsert?: Maybe<TodoUpsertWithoutTasksInput>;
};

export type TodoUpdateWithoutTasksDataInput = {
  pinned?: Maybe<BoolFieldUpdateOperationsInput>;
  title?: Maybe<NullableStringFieldUpdateOperationsInput>;
  description?: Maybe<NullableStringFieldUpdateOperationsInput>;
  checked?: Maybe<BoolFieldUpdateOperationsInput>;
  checkedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  type?: Maybe<Type>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  list?: Maybe<ListUpdateOneWithoutTodosInput>;
  comments?: Maybe<CommentUpdateManyWithoutTodoInput>;
  requires?: Maybe<TodoUpdateManyWithoutRequiredByInput>;
  requiredBy?: Maybe<TodoUpdateManyWithoutRequiresInput>;
  tags?: Maybe<TagUpdateManyWithoutTodosInput>;
  user?: Maybe<UserUpdateOneWithoutTodosInput>;
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
  pinned?: Maybe<BoolFieldUpdateOperationsInput>;
  title?: Maybe<NullableStringFieldUpdateOperationsInput>;
  description?: Maybe<NullableStringFieldUpdateOperationsInput>;
  checked?: Maybe<BoolFieldUpdateOperationsInput>;
  checkedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  type?: Maybe<Type>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  tasks?: Maybe<TaskUpdateManyWithoutTodoInput>;
  list?: Maybe<ListUpdateOneWithoutTodosInput>;
  comments?: Maybe<CommentUpdateManyWithoutTodoInput>;
  requiredBy?: Maybe<TodoUpdateManyWithoutRequiresInput>;
  tags?: Maybe<TagUpdateManyWithoutTodosInput>;
  user?: Maybe<UserUpdateOneWithoutTodosInput>;
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
  text?: Maybe<StringFieldUpdateOperationsInput>;
  color?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  user?: Maybe<UserUpdateOneWithoutTagsInput>;
};

export type UserUpdateOneWithoutTagsInput = {
  create?: Maybe<UserCreateWithoutTagsInput>;
  connect?: Maybe<UserWhereUniqueInput>;
  disconnect?: Maybe<Scalars['Boolean']>;
  delete?: Maybe<Scalars['Boolean']>;
  update?: Maybe<UserUpdateWithoutTagsDataInput>;
  upsert?: Maybe<UserUpsertWithoutTagsInput>;
};

export type UserUpdateWithoutTagsDataInput = {
  username?: Maybe<StringFieldUpdateOperationsInput>;
  email?: Maybe<StringFieldUpdateOperationsInput>;
  password?: Maybe<StringFieldUpdateOperationsInput>;
  role?: Maybe<Role>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  todos?: Maybe<TodoUpdateManyWithoutUserInput>;
  tasks?: Maybe<TaskUpdateManyWithoutUserInput>;
  lists?: Maybe<ListUpdateManyWithoutUserInput>;
  comments?: Maybe<CommentUpdateManyWithoutUserInput>;
  sharedLists?: Maybe<ListUpdateManyWithoutSharedWithInput>;
};

export type CommentUpdateManyWithoutUserInput = {
  create?: Maybe<Array<CommentCreateWithoutUserInput>>;
  connect?: Maybe<Array<CommentWhereUniqueInput>>;
  set?: Maybe<Array<CommentWhereUniqueInput>>;
  disconnect?: Maybe<Array<CommentWhereUniqueInput>>;
  delete?: Maybe<Array<CommentWhereUniqueInput>>;
  update?: Maybe<Array<CommentUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: Maybe<Array<CommentUpdateManyWithWhereNestedInput>>;
  deleteMany?: Maybe<Array<CommentScalarWhereInput>>;
  upsert?: Maybe<Array<CommentUpsertWithWhereUniqueWithoutUserInput>>;
};

export type CommentUpdateWithWhereUniqueWithoutUserInput = {
  where: CommentWhereUniqueInput;
  data: CommentUpdateWithoutUserDataInput;
};

export type CommentUpdateWithoutUserDataInput = {
  title?: Maybe<StringFieldUpdateOperationsInput>;
  content?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  todo?: Maybe<TodoUpdateOneRequiredWithoutCommentsInput>;
};

export type TodoUpdateOneRequiredWithoutCommentsInput = {
  create?: Maybe<TodoCreateWithoutCommentsInput>;
  connect?: Maybe<TodoWhereUniqueInput>;
  update?: Maybe<TodoUpdateWithoutCommentsDataInput>;
  upsert?: Maybe<TodoUpsertWithoutCommentsInput>;
};

export type TodoUpdateWithoutCommentsDataInput = {
  pinned?: Maybe<BoolFieldUpdateOperationsInput>;
  title?: Maybe<NullableStringFieldUpdateOperationsInput>;
  description?: Maybe<NullableStringFieldUpdateOperationsInput>;
  checked?: Maybe<BoolFieldUpdateOperationsInput>;
  checkedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  type?: Maybe<Type>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  tasks?: Maybe<TaskUpdateManyWithoutTodoInput>;
  list?: Maybe<ListUpdateOneWithoutTodosInput>;
  requires?: Maybe<TodoUpdateManyWithoutRequiredByInput>;
  requiredBy?: Maybe<TodoUpdateManyWithoutRequiresInput>;
  tags?: Maybe<TagUpdateManyWithoutTodosInput>;
  user?: Maybe<UserUpdateOneWithoutTodosInput>;
};

export type UserUpdateOneWithoutTodosInput = {
  create?: Maybe<UserCreateWithoutTodosInput>;
  connect?: Maybe<UserWhereUniqueInput>;
  disconnect?: Maybe<Scalars['Boolean']>;
  delete?: Maybe<Scalars['Boolean']>;
  update?: Maybe<UserUpdateWithoutTodosDataInput>;
  upsert?: Maybe<UserUpsertWithoutTodosInput>;
};

export type UserUpdateWithoutTodosDataInput = {
  username?: Maybe<StringFieldUpdateOperationsInput>;
  email?: Maybe<StringFieldUpdateOperationsInput>;
  password?: Maybe<StringFieldUpdateOperationsInput>;
  role?: Maybe<Role>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  tasks?: Maybe<TaskUpdateManyWithoutUserInput>;
  lists?: Maybe<ListUpdateManyWithoutUserInput>;
  tags?: Maybe<TagUpdateManyWithoutUserInput>;
  comments?: Maybe<CommentUpdateManyWithoutUserInput>;
  sharedLists?: Maybe<ListUpdateManyWithoutSharedWithInput>;
};

export type TagUpdateManyWithoutUserInput = {
  create?: Maybe<Array<TagCreateWithoutUserInput>>;
  connect?: Maybe<Array<TagWhereUniqueInput>>;
  set?: Maybe<Array<TagWhereUniqueInput>>;
  disconnect?: Maybe<Array<TagWhereUniqueInput>>;
  delete?: Maybe<Array<TagWhereUniqueInput>>;
  update?: Maybe<Array<TagUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: Maybe<Array<TagUpdateManyWithWhereNestedInput>>;
  deleteMany?: Maybe<Array<TagScalarWhereInput>>;
  upsert?: Maybe<Array<TagUpsertWithWhereUniqueWithoutUserInput>>;
};

export type TagUpdateWithWhereUniqueWithoutUserInput = {
  where: TagWhereUniqueInput;
  data: TagUpdateWithoutUserDataInput;
};

export type TagUpdateWithoutUserDataInput = {
  text?: Maybe<StringFieldUpdateOperationsInput>;
  color?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
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
  pinned?: Maybe<BoolFieldUpdateOperationsInput>;
  title?: Maybe<NullableStringFieldUpdateOperationsInput>;
  description?: Maybe<NullableStringFieldUpdateOperationsInput>;
  checked?: Maybe<BoolFieldUpdateOperationsInput>;
  checkedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  type?: Maybe<Type>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  tasks?: Maybe<TaskUpdateManyWithoutTodoInput>;
  list?: Maybe<ListUpdateOneWithoutTodosInput>;
  comments?: Maybe<CommentUpdateManyWithoutTodoInput>;
  requires?: Maybe<TodoUpdateManyWithoutRequiredByInput>;
  requiredBy?: Maybe<TodoUpdateManyWithoutRequiresInput>;
  user?: Maybe<UserUpdateOneWithoutTodosInput>;
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
  pinned?: Maybe<BoolFilter>;
  title?: Maybe<StringNullableFilter>;
  description?: Maybe<StringNullableFilter>;
  checked?: Maybe<BoolFilter>;
  checkedAt?: Maybe<DateTimeNullableFilter>;
  listId?: Maybe<IntNullableFilter>;
  type?: Maybe<Type>;
  userId?: Maybe<IntNullableFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
};

export type TodoUpdateManyDataInput = {
  pinned?: Maybe<BoolFieldUpdateOperationsInput>;
  title?: Maybe<NullableStringFieldUpdateOperationsInput>;
  description?: Maybe<NullableStringFieldUpdateOperationsInput>;
  checked?: Maybe<BoolFieldUpdateOperationsInput>;
  checkedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  type?: Maybe<Type>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};

export type TodoUpsertWithWhereUniqueWithoutTagsInput = {
  where: TodoWhereUniqueInput;
  update: TodoUpdateWithoutTagsDataInput;
  create: TodoCreateWithoutTagsInput;
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
  userId?: Maybe<IntNullableFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
};

export type TagUpdateManyDataInput = {
  text?: Maybe<StringFieldUpdateOperationsInput>;
  color?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};

export type TagUpsertWithWhereUniqueWithoutUserInput = {
  where: TagWhereUniqueInput;
  update: TagUpdateWithoutUserDataInput;
  create: TagCreateWithoutUserInput;
};

export type ListUpdateManyWithoutSharedWithInput = {
  create?: Maybe<Array<ListCreateWithoutSharedWithInput>>;
  connect?: Maybe<Array<ListWhereUniqueInput>>;
  set?: Maybe<Array<ListWhereUniqueInput>>;
  disconnect?: Maybe<Array<ListWhereUniqueInput>>;
  delete?: Maybe<Array<ListWhereUniqueInput>>;
  update?: Maybe<Array<ListUpdateWithWhereUniqueWithoutSharedWithInput>>;
  updateMany?: Maybe<Array<ListUpdateManyWithWhereNestedInput>>;
  deleteMany?: Maybe<Array<ListScalarWhereInput>>;
  upsert?: Maybe<Array<ListUpsertWithWhereUniqueWithoutSharedWithInput>>;
};

export type ListUpdateWithWhereUniqueWithoutSharedWithInput = {
  where: ListWhereUniqueInput;
  data: ListUpdateWithoutSharedWithDataInput;
};

export type ListUpdateWithoutSharedWithDataInput = {
  title?: Maybe<NullableStringFieldUpdateOperationsInput>;
  archivedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  todos?: Maybe<TodoUpdateManyWithoutListInput>;
  user?: Maybe<UserUpdateOneWithoutListsInput>;
};

export type ListUpdateManyWithWhereNestedInput = {
  where: ListScalarWhereInput;
  data: ListUpdateManyDataInput;
};

export type ListScalarWhereInput = {
  AND?: Maybe<Array<ListScalarWhereInput>>;
  OR?: Maybe<Array<ListScalarWhereInput>>;
  NOT?: Maybe<Array<ListScalarWhereInput>>;
  id?: Maybe<IntFilter>;
  title?: Maybe<StringNullableFilter>;
  userId?: Maybe<IntNullableFilter>;
  archivedAt?: Maybe<DateTimeNullableFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
};

export type ListUpdateManyDataInput = {
  title?: Maybe<NullableStringFieldUpdateOperationsInput>;
  archivedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};

export type ListUpsertWithWhereUniqueWithoutSharedWithInput = {
  where: ListWhereUniqueInput;
  update: ListUpdateWithoutSharedWithDataInput;
  create: ListCreateWithoutSharedWithInput;
};

export type UserUpsertWithoutTodosInput = {
  update: UserUpdateWithoutTodosDataInput;
  create: UserCreateWithoutTodosInput;
};

export type TodoUpsertWithoutCommentsInput = {
  update: TodoUpdateWithoutCommentsDataInput;
  create: TodoCreateWithoutCommentsInput;
};

export type CommentUpsertWithWhereUniqueWithoutUserInput = {
  where: CommentWhereUniqueInput;
  update: CommentUpdateWithoutUserDataInput;
  create: CommentCreateWithoutUserInput;
};

export type UserUpsertWithoutTagsInput = {
  update: UserUpdateWithoutTagsDataInput;
  create: UserCreateWithoutTagsInput;
};

export type TagUpsertWithWhereUniqueWithoutTodosInput = {
  where: TagWhereUniqueInput;
  update: TagUpdateWithoutTodosDataInput;
  create: TagCreateWithoutTodosInput;
};

export type TodoUpsertWithWhereUniqueWithoutRequiresInput = {
  where: TodoWhereUniqueInput;
  update: TodoUpdateWithoutRequiresDataInput;
  create: TodoCreateWithoutRequiresInput;
};

export type TodoUpsertWithoutTasksInput = {
  update: TodoUpdateWithoutTasksDataInput;
  create: TodoCreateWithoutTasksInput;
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
  todoId?: Maybe<IntFilter>;
  title?: Maybe<StringFilter>;
  userId?: Maybe<IntNullableFilter>;
  checkedAt?: Maybe<DateTimeNullableFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
};

export type TaskUpdateManyDataInput = {
  title?: Maybe<StringFieldUpdateOperationsInput>;
  checkedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};

export type TaskUpsertWithWhereUniqueWithoutUserInput = {
  where: TaskWhereUniqueInput;
  update: TaskUpdateWithoutUserDataInput;
  create: TaskCreateWithoutUserInput;
};

export type UserUpsertWithoutListsInput = {
  update: UserUpdateWithoutListsDataInput;
  create: UserCreateWithoutListsInput;
};

export type UserUpdateManyWithoutSharedListsInput = {
  create?: Maybe<Array<UserCreateWithoutSharedListsInput>>;
  connect?: Maybe<Array<UserWhereUniqueInput>>;
  set?: Maybe<Array<UserWhereUniqueInput>>;
  disconnect?: Maybe<Array<UserWhereUniqueInput>>;
  delete?: Maybe<Array<UserWhereUniqueInput>>;
  update?: Maybe<Array<UserUpdateWithWhereUniqueWithoutSharedListsInput>>;
  updateMany?: Maybe<Array<UserUpdateManyWithWhereNestedInput>>;
  deleteMany?: Maybe<Array<UserScalarWhereInput>>;
  upsert?: Maybe<Array<UserUpsertWithWhereUniqueWithoutSharedListsInput>>;
};

export type UserUpdateWithWhereUniqueWithoutSharedListsInput = {
  where: UserWhereUniqueInput;
  data: UserUpdateWithoutSharedListsDataInput;
};

export type UserUpdateWithoutSharedListsDataInput = {
  username?: Maybe<StringFieldUpdateOperationsInput>;
  email?: Maybe<StringFieldUpdateOperationsInput>;
  password?: Maybe<StringFieldUpdateOperationsInput>;
  role?: Maybe<Role>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  todos?: Maybe<TodoUpdateManyWithoutUserInput>;
  tasks?: Maybe<TaskUpdateManyWithoutUserInput>;
  lists?: Maybe<ListUpdateManyWithoutUserInput>;
  tags?: Maybe<TagUpdateManyWithoutUserInput>;
  comments?: Maybe<CommentUpdateManyWithoutUserInput>;
};

export type UserUpdateManyWithWhereNestedInput = {
  where: UserScalarWhereInput;
  data: UserUpdateManyDataInput;
};

export type UserScalarWhereInput = {
  AND?: Maybe<Array<UserScalarWhereInput>>;
  OR?: Maybe<Array<UserScalarWhereInput>>;
  NOT?: Maybe<Array<UserScalarWhereInput>>;
  id?: Maybe<IntFilter>;
  username?: Maybe<StringFilter>;
  email?: Maybe<StringFilter>;
  password?: Maybe<StringFilter>;
  role?: Maybe<Role>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
};

export type UserUpdateManyDataInput = {
  username?: Maybe<StringFieldUpdateOperationsInput>;
  email?: Maybe<StringFieldUpdateOperationsInput>;
  password?: Maybe<StringFieldUpdateOperationsInput>;
  role?: Maybe<Role>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};

export type UserUpsertWithWhereUniqueWithoutSharedListsInput = {
  where: UserWhereUniqueInput;
  update: UserUpdateWithoutSharedListsDataInput;
  create: UserCreateWithoutSharedListsInput;
};

export type ListUpsertWithoutTodosInput = {
  update: ListUpdateWithoutTodosDataInput;
  create: ListCreateWithoutTodosInput;
};

export type TodoUpsertWithWhereUniqueWithoutRequiredByInput = {
  where: TodoWhereUniqueInput;
  update: TodoUpdateWithoutRequiredByDataInput;
  create: TodoCreateWithoutRequiredByInput;
};

export type TodoUpsertWithWhereUniqueWithoutListInput = {
  where: TodoWhereUniqueInput;
  update: TodoUpdateWithoutListDataInput;
  create: TodoCreateWithoutListInput;
};

export type ListUpsertWithWhereUniqueWithoutUserInput = {
  where: ListWhereUniqueInput;
  update: ListUpdateWithoutUserDataInput;
  create: ListCreateWithoutUserInput;
};

export type UserUpsertWithoutTasksInput = {
  update: UserUpdateWithoutTasksDataInput;
  create: UserCreateWithoutTasksInput;
};

export type TaskUpsertWithWhereUniqueWithoutTodoInput = {
  where: TaskWhereUniqueInput;
  update: TaskUpdateWithoutTodoDataInput;
  create: TaskCreateWithoutTodoInput;
};

export type TodoUpsertWithWhereUniqueWithoutUserInput = {
  where: TodoWhereUniqueInput;
  update: TodoUpdateWithoutUserDataInput;
  create: TodoCreateWithoutUserInput;
};

export type UserUpsertWithoutCommentsInput = {
  update: UserUpdateWithoutCommentsDataInput;
  create: UserCreateWithoutCommentsInput;
};

export type TagCreateInput = {
  text: Scalars['String'];
  color?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  todos?: Maybe<TodoCreateManyWithoutTagsInput>;
  user?: Maybe<UserCreateOneWithoutTagsInput>;
};

export type TagUpdateInput = {
  text?: Maybe<StringFieldUpdateOperationsInput>;
  color?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  todos?: Maybe<TodoUpdateManyWithoutTagsInput>;
  user?: Maybe<UserUpdateOneWithoutTagsInput>;
};

export type TaskCreateInput = {
  title: Scalars['String'];
  checkedAt?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  todo: TodoCreateOneWithoutTasksInput;
  user?: Maybe<UserCreateOneWithoutTasksInput>;
};

export type TaskUpdateInput = {
  title?: Maybe<StringFieldUpdateOperationsInput>;
  checkedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  todo?: Maybe<TodoUpdateOneRequiredWithoutTasksInput>;
  user?: Maybe<UserUpdateOneWithoutTasksInput>;
};

export type TaskUpdateManyMutationInput = {
  title?: Maybe<StringFieldUpdateOperationsInput>;
  checkedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};

export type BatchPayload = {
  __typename?: 'BatchPayload';
  count: Scalars['Int'];
};

export type TodoCreateInput = {
  pinned?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  checked?: Maybe<Scalars['Boolean']>;
  checkedAt?: Maybe<Scalars['DateTime']>;
  type?: Maybe<Type>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  tasks?: Maybe<TaskCreateManyWithoutTodoInput>;
  list?: Maybe<ListCreateOneWithoutTodosInput>;
  comments?: Maybe<CommentCreateManyWithoutTodoInput>;
  requires?: Maybe<TodoCreateManyWithoutRequiredByInput>;
  requiredBy?: Maybe<TodoCreateManyWithoutRequiresInput>;
  tags?: Maybe<TagCreateManyWithoutTodosInput>;
  user?: Maybe<UserCreateOneWithoutTodosInput>;
};

export type TodoUpdateInput = {
  pinned?: Maybe<BoolFieldUpdateOperationsInput>;
  title?: Maybe<NullableStringFieldUpdateOperationsInput>;
  description?: Maybe<NullableStringFieldUpdateOperationsInput>;
  checked?: Maybe<BoolFieldUpdateOperationsInput>;
  checkedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  type?: Maybe<Type>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  tasks?: Maybe<TaskUpdateManyWithoutTodoInput>;
  list?: Maybe<ListUpdateOneWithoutTodosInput>;
  comments?: Maybe<CommentUpdateManyWithoutTodoInput>;
  requires?: Maybe<TodoUpdateManyWithoutRequiredByInput>;
  requiredBy?: Maybe<TodoUpdateManyWithoutRequiresInput>;
  tags?: Maybe<TagUpdateManyWithoutTodosInput>;
  user?: Maybe<UserUpdateOneWithoutTodosInput>;
};

export type TodoUpdateManyMutationInput = {
  pinned?: Maybe<BoolFieldUpdateOperationsInput>;
  title?: Maybe<NullableStringFieldUpdateOperationsInput>;
  description?: Maybe<NullableStringFieldUpdateOperationsInput>;
  checked?: Maybe<BoolFieldUpdateOperationsInput>;
  checkedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  type?: Maybe<Type>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};

export type ListCreateInput = {
  title?: Maybe<Scalars['String']>;
  archivedAt?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  todos?: Maybe<TodoCreateManyWithoutListInput>;
  user?: Maybe<UserCreateOneWithoutListsInput>;
  sharedWith?: Maybe<UserCreateManyWithoutSharedListsInput>;
};

export type ListUpdateInput = {
  title?: Maybe<NullableStringFieldUpdateOperationsInput>;
  archivedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  todos?: Maybe<TodoUpdateManyWithoutListInput>;
  user?: Maybe<UserUpdateOneWithoutListsInput>;
  sharedWith?: Maybe<UserUpdateManyWithoutSharedListsInput>;
};


export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'token'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )> }
  )> }
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register?: Maybe<(
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'token'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )> }
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  )> }
);

export type CreateListMutationVariables = Exact<{
  title: Scalars['String'];
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

export type ShareListWithUserMutationVariables = Exact<{
  userId: Scalars['Int'];
  listId: Scalars['Int'];
}>;


export type ShareListWithUserMutation = (
  { __typename?: 'Mutation' }
  & { updateOneList?: Maybe<(
    { __typename?: 'List' }
    & Pick<List, 'id'>
    & { sharedWith: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
    )> }
  )> }
);

export type DisconnectListWithUserMutationVariables = Exact<{
  userId: Scalars['Int'];
  listId: Scalars['Int'];
}>;


export type DisconnectListWithUserMutation = (
  { __typename?: 'Mutation' }
  & { updateOneList?: Maybe<(
    { __typename?: 'List' }
    & Pick<List, 'id'>
    & { sharedWith: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
    )> }
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
    )>, sharedWith: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
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
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
    )>, sharedWith: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )>, todos: Array<(
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

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  )> }
);

export type CreateNoteMutationVariables = Exact<{
  title: Scalars['String'];
  description: Scalars['String'];
}>;


export type CreateNoteMutation = (
  { __typename?: 'Mutation' }
  & { createOneTodo: (
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'title' | 'description'>
  ) }
);

export type UpdateNoteMutationVariables = Exact<{
  id: Scalars['Int'];
  title: Scalars['String'];
  description: Scalars['String'];
}>;


export type UpdateNoteMutation = (
  { __typename?: 'Mutation' }
  & { updateOneTodo?: Maybe<(
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'title' | 'description'>
  )> }
);

export type NotesQueryVariables = Exact<{ [key: string]: never; }>;


export type NotesQuery = (
  { __typename?: 'Query' }
  & { todos: Array<(
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'title' | 'description'>
  )> }
);

export type NoteQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type NoteQuery = (
  { __typename?: 'Query' }
  & { todo?: Maybe<(
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'title' | 'description'>
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
    & Pick<Todo, 'id' | 'title' | 'pinned' | 'description' | 'checked' | 'createdAt' | 'commentsCount'>
    & { comments: Array<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'id' | 'title' | 'content' | 'createdAt'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username'>
      ) }
    )>, tags: Array<(
      { __typename?: 'Tag' }
      & Pick<Tag, 'id' | 'text' | 'color'>
    )>, tasks: Array<(
      { __typename?: 'Task' }
      & Pick<Task, 'id' | 'title' | 'checkedAt'>
    )>, list?: Maybe<(
      { __typename?: 'List' }
      & Pick<List, 'id' | 'title'>
      & { sharedWith: Array<(
        { __typename?: 'User' }
        & Pick<User, 'id'>
      )> }
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

export type UpdatePinTodoMutationVariables = Exact<{
  id: Scalars['Int'];
  pinned?: Maybe<Scalars['Boolean']>;
}>;


export type UpdatePinTodoMutation = (
  { __typename?: 'Mutation' }
  & { updateOneTodo?: Maybe<(
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'pinned'>
  )> }
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
      & Pick<List, 'id' | 'title'>
    )> }
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

export type ConnectTodoToListMutationVariables = Exact<{
  id: Scalars['Int'];
  listId: Scalars['Int'];
}>;


export type ConnectTodoToListMutation = (
  { __typename?: 'Mutation' }
  & { updateOneTodo?: Maybe<(
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'title' | 'description'>
    & { list?: Maybe<(
      { __typename?: 'List' }
      & Pick<List, 'id'>
    )> }
  )> }
);

export type UpdateTaskMutationVariables = Exact<{
  id: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
}>;


export type UpdateTaskMutation = (
  { __typename?: 'Mutation' }
  & { updateOneTask?: Maybe<(
    { __typename?: 'Task' }
    & Pick<Task, 'id' | 'title'>
  )> }
);

export type DeleteTaskMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteTaskMutation = (
  { __typename?: 'Mutation' }
  & { deleteOneTask?: Maybe<(
    { __typename?: 'Task' }
    & Pick<Task, 'id'>
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

export type AddTagToTodosMutationVariables = Exact<{
  id: Scalars['Int'];
  todos?: Maybe<Array<TodoWhereUniqueInput>>;
}>;


export type AddTagToTodosMutation = (
  { __typename?: 'Mutation' }
  & { updateOneTag?: Maybe<(
    { __typename?: 'Tag' }
    & Pick<Tag, 'id'>
    & { todos: Array<(
      { __typename?: 'Todo' }
      & Pick<Todo, 'id'>
    )> }
  )> }
);

export type AddTagsToTodoMutationVariables = Exact<{
  id: Scalars['Int'];
  tags?: Maybe<Array<TagWhereUniqueInput>>;
}>;


export type AddTagsToTodoMutation = (
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

export type AddCommentMutationVariables = Exact<{
  todoId: Scalars['Int'];
  title: Scalars['String'];
  content?: Maybe<Scalars['String']>;
}>;


export type AddCommentMutation = (
  { __typename?: 'Mutation' }
  & { createOneComment: (
    { __typename?: 'Comment' }
    & Pick<Comment, 'id' | 'title' | 'content'>
    & { todo: (
      { __typename?: 'Todo' }
      & Pick<Todo, 'id'>
    ), user: (
      { __typename?: 'User' }
      & Pick<User, 'id'>
    ) }
  ) }
);

export type DeleteCommentMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteCommentMutation = (
  { __typename?: 'Mutation' }
  & { deleteOneComment?: Maybe<(
    { __typename?: 'Comment' }
    & Pick<Comment, 'id'>
  )> }
);

export type UpdateCommentMutationVariables = Exact<{
  id: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
}>;


export type UpdateCommentMutation = (
  { __typename?: 'Mutation' }
  & { updateOneComment?: Maybe<(
    { __typename?: 'Comment' }
    & Pick<Comment, 'id' | 'title' | 'content'>
  )> }
);


export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      id
      username
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation register($username: String!, $email: String!, $password: String!) {
  register(username: $username, email: $email, password: $password) {
    token
    user {
      id
      username
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const MeDocument = gql`
    query ME {
  me {
    id
    username
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const CreateListDocument = gql`
    mutation createList($title: String!) {
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
  updateOneList(where: {id: $id}, data: {title: {set: $title}}) {
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
export const ShareListWithUserDocument = gql`
    mutation shareListWithUser($userId: Int!, $listId: Int!) {
  updateOneList(where: {id: $listId}, data: {sharedWith: {connect: {id: $userId}}}) {
    id
    sharedWith {
      id
    }
  }
}
    `;
export type ShareListWithUserMutationFn = Apollo.MutationFunction<ShareListWithUserMutation, ShareListWithUserMutationVariables>;

/**
 * __useShareListWithUserMutation__
 *
 * To run a mutation, you first call `useShareListWithUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useShareListWithUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [shareListWithUserMutation, { data, loading, error }] = useShareListWithUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      listId: // value for 'listId'
 *   },
 * });
 */
export function useShareListWithUserMutation(baseOptions?: Apollo.MutationHookOptions<ShareListWithUserMutation, ShareListWithUserMutationVariables>) {
        return Apollo.useMutation<ShareListWithUserMutation, ShareListWithUserMutationVariables>(ShareListWithUserDocument, baseOptions);
      }
export type ShareListWithUserMutationHookResult = ReturnType<typeof useShareListWithUserMutation>;
export type ShareListWithUserMutationResult = Apollo.MutationResult<ShareListWithUserMutation>;
export type ShareListWithUserMutationOptions = Apollo.BaseMutationOptions<ShareListWithUserMutation, ShareListWithUserMutationVariables>;
export const DisconnectListWithUserDocument = gql`
    mutation disconnectListWithUser($userId: Int!, $listId: Int!) {
  updateOneList(where: {id: $listId}, data: {sharedWith: {disconnect: {id: $userId}}}) {
    id
    sharedWith {
      id
    }
  }
}
    `;
export type DisconnectListWithUserMutationFn = Apollo.MutationFunction<DisconnectListWithUserMutation, DisconnectListWithUserMutationVariables>;

/**
 * __useDisconnectListWithUserMutation__
 *
 * To run a mutation, you first call `useDisconnectListWithUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDisconnectListWithUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [disconnectListWithUserMutation, { data, loading, error }] = useDisconnectListWithUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      listId: // value for 'listId'
 *   },
 * });
 */
export function useDisconnectListWithUserMutation(baseOptions?: Apollo.MutationHookOptions<DisconnectListWithUserMutation, DisconnectListWithUserMutationVariables>) {
        return Apollo.useMutation<DisconnectListWithUserMutation, DisconnectListWithUserMutationVariables>(DisconnectListWithUserDocument, baseOptions);
      }
export type DisconnectListWithUserMutationHookResult = ReturnType<typeof useDisconnectListWithUserMutation>;
export type DisconnectListWithUserMutationResult = Apollo.MutationResult<DisconnectListWithUserMutation>;
export type DisconnectListWithUserMutationOptions = Apollo.BaseMutationOptions<DisconnectListWithUserMutation, DisconnectListWithUserMutationVariables>;
export const ListsDocument = gql`
    query LISTS {
  lists(orderBy: {id: desc}) {
    id
    title
    todos(last: 5) {
      id
      title
    }
    sharedWith {
      id
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
    user {
      id
    }
    sharedWith {
      id
      username
    }
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
export const UsersDocument = gql`
    query USERS {
  users {
    id
    username
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const CreateNoteDocument = gql`
    mutation createNote($title: String!, $description: String!) {
  createOneTodo(data: {title: $title, description: $description, type: NOTE}) {
    id
    title
    description
  }
}
    `;
export type CreateNoteMutationFn = Apollo.MutationFunction<CreateNoteMutation, CreateNoteMutationVariables>;

/**
 * __useCreateNoteMutation__
 *
 * To run a mutation, you first call `useCreateNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNoteMutation, { data, loading, error }] = useCreateNoteMutation({
 *   variables: {
 *      title: // value for 'title'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateNoteMutation(baseOptions?: Apollo.MutationHookOptions<CreateNoteMutation, CreateNoteMutationVariables>) {
        return Apollo.useMutation<CreateNoteMutation, CreateNoteMutationVariables>(CreateNoteDocument, baseOptions);
      }
export type CreateNoteMutationHookResult = ReturnType<typeof useCreateNoteMutation>;
export type CreateNoteMutationResult = Apollo.MutationResult<CreateNoteMutation>;
export type CreateNoteMutationOptions = Apollo.BaseMutationOptions<CreateNoteMutation, CreateNoteMutationVariables>;
export const UpdateNoteDocument = gql`
    mutation updateNote($id: Int!, $title: String!, $description: String!) {
  updateOneTodo(where: {id: $id}, data: {title: {set: $title}, description: {set: $description}}) {
    id
    title
    description
  }
}
    `;
export type UpdateNoteMutationFn = Apollo.MutationFunction<UpdateNoteMutation, UpdateNoteMutationVariables>;

/**
 * __useUpdateNoteMutation__
 *
 * To run a mutation, you first call `useUpdateNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNoteMutation, { data, loading, error }] = useUpdateNoteMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useUpdateNoteMutation(baseOptions?: Apollo.MutationHookOptions<UpdateNoteMutation, UpdateNoteMutationVariables>) {
        return Apollo.useMutation<UpdateNoteMutation, UpdateNoteMutationVariables>(UpdateNoteDocument, baseOptions);
      }
export type UpdateNoteMutationHookResult = ReturnType<typeof useUpdateNoteMutation>;
export type UpdateNoteMutationResult = Apollo.MutationResult<UpdateNoteMutation>;
export type UpdateNoteMutationOptions = Apollo.BaseMutationOptions<UpdateNoteMutation, UpdateNoteMutationVariables>;
export const NotesDocument = gql`
    query Notes {
  todos(orderBy: {id: desc}, where: {type: NOTE}) {
    id
    title
    description
  }
}
    `;

/**
 * __useNotesQuery__
 *
 * To run a query within a React component, call `useNotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotesQuery({
 *   variables: {
 *   },
 * });
 */
export function useNotesQuery(baseOptions?: Apollo.QueryHookOptions<NotesQuery, NotesQueryVariables>) {
        return Apollo.useQuery<NotesQuery, NotesQueryVariables>(NotesDocument, baseOptions);
      }
export function useNotesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NotesQuery, NotesQueryVariables>) {
          return Apollo.useLazyQuery<NotesQuery, NotesQueryVariables>(NotesDocument, baseOptions);
        }
export type NotesQueryHookResult = ReturnType<typeof useNotesQuery>;
export type NotesLazyQueryHookResult = ReturnType<typeof useNotesLazyQuery>;
export type NotesQueryResult = Apollo.QueryResult<NotesQuery, NotesQueryVariables>;
export const NoteDocument = gql`
    query Note($id: Int!) {
  todo(where: {id: $id}) {
    id
    title
    description
  }
}
    `;

/**
 * __useNoteQuery__
 *
 * To run a query within a React component, call `useNoteQuery` and pass it any options that fit your needs.
 * When your component renders, `useNoteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNoteQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useNoteQuery(baseOptions?: Apollo.QueryHookOptions<NoteQuery, NoteQueryVariables>) {
        return Apollo.useQuery<NoteQuery, NoteQueryVariables>(NoteDocument, baseOptions);
      }
export function useNoteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NoteQuery, NoteQueryVariables>) {
          return Apollo.useLazyQuery<NoteQuery, NoteQueryVariables>(NoteDocument, baseOptions);
        }
export type NoteQueryHookResult = ReturnType<typeof useNoteQuery>;
export type NoteLazyQueryHookResult = ReturnType<typeof useNoteLazyQuery>;
export type NoteQueryResult = Apollo.QueryResult<NoteQuery, NoteQueryVariables>;
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
  updateOneTag(where: {id: $id}, data: {text: {set: $text}, color: {set: $color}}) {
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
  todos(orderBy: [{pinned: desc}, {id: desc}], where: {type: TODO}) {
    id
    title
    pinned
    description
    checked
    createdAt
    commentsCount
    comments {
      id
      title
      content
      createdAt
      user {
        id
        username
      }
    }
    tags(orderBy: {id: desc}) {
      id
      text
      color
    }
    tasks(orderBy: {id: asc}) {
      id
      title
      checkedAt
    }
    list {
      id
      title
      sharedWith {
        id
      }
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
export const UpdatePinTodoDocument = gql`
    mutation updatePinTodo($id: Int!, $pinned: Boolean) {
  updateOneTodo(where: {id: $id}, data: {pinned: {set: $pinned}}) {
    id
    pinned
  }
}
    `;
export type UpdatePinTodoMutationFn = Apollo.MutationFunction<UpdatePinTodoMutation, UpdatePinTodoMutationVariables>;

/**
 * __useUpdatePinTodoMutation__
 *
 * To run a mutation, you first call `useUpdatePinTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePinTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePinTodoMutation, { data, loading, error }] = useUpdatePinTodoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      pinned: // value for 'pinned'
 *   },
 * });
 */
export function useUpdatePinTodoMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePinTodoMutation, UpdatePinTodoMutationVariables>) {
        return Apollo.useMutation<UpdatePinTodoMutation, UpdatePinTodoMutationVariables>(UpdatePinTodoDocument, baseOptions);
      }
export type UpdatePinTodoMutationHookResult = ReturnType<typeof useUpdatePinTodoMutation>;
export type UpdatePinTodoMutationResult = Apollo.MutationResult<UpdatePinTodoMutation>;
export type UpdatePinTodoMutationOptions = Apollo.BaseMutationOptions<UpdatePinTodoMutation, UpdatePinTodoMutationVariables>;
export const CheckAllTasksDocument = gql`
    mutation checkAllTasks($todoId: Int, $checkedAt: DateTime) {
  updateManyTask(where: {todoId: {equals: $todoId}}, data: {checkedAt: {set: $checkedAt}}) {
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
      title
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
    mutation updateTodo($id: Int!, $title: String, $description: String) {
  updateOneTodo(where: {id: $id}, data: {title: {set: $title}, description: {set: $description}}) {
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
export const ConnectTodoToListDocument = gql`
    mutation connectTodoToList($id: Int!, $listId: Int!) {
  updateOneTodo(where: {id: $id}, data: {list: {connect: {id: $listId}}}) {
    id
    title
    description
    list {
      id
    }
  }
}
    `;
export type ConnectTodoToListMutationFn = Apollo.MutationFunction<ConnectTodoToListMutation, ConnectTodoToListMutationVariables>;

/**
 * __useConnectTodoToListMutation__
 *
 * To run a mutation, you first call `useConnectTodoToListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConnectTodoToListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [connectTodoToListMutation, { data, loading, error }] = useConnectTodoToListMutation({
 *   variables: {
 *      id: // value for 'id'
 *      listId: // value for 'listId'
 *   },
 * });
 */
export function useConnectTodoToListMutation(baseOptions?: Apollo.MutationHookOptions<ConnectTodoToListMutation, ConnectTodoToListMutationVariables>) {
        return Apollo.useMutation<ConnectTodoToListMutation, ConnectTodoToListMutationVariables>(ConnectTodoToListDocument, baseOptions);
      }
export type ConnectTodoToListMutationHookResult = ReturnType<typeof useConnectTodoToListMutation>;
export type ConnectTodoToListMutationResult = Apollo.MutationResult<ConnectTodoToListMutation>;
export type ConnectTodoToListMutationOptions = Apollo.BaseMutationOptions<ConnectTodoToListMutation, ConnectTodoToListMutationVariables>;
export const UpdateTaskDocument = gql`
    mutation updateTask($id: Int!, $title: String) {
  updateOneTask(where: {id: $id}, data: {title: {set: $title}}) {
    id
    title
  }
}
    `;
export type UpdateTaskMutationFn = Apollo.MutationFunction<UpdateTaskMutation, UpdateTaskMutationVariables>;

/**
 * __useUpdateTaskMutation__
 *
 * To run a mutation, you first call `useUpdateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskMutation, { data, loading, error }] = useUpdateTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useUpdateTaskMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskMutation, UpdateTaskMutationVariables>) {
        return Apollo.useMutation<UpdateTaskMutation, UpdateTaskMutationVariables>(UpdateTaskDocument, baseOptions);
      }
export type UpdateTaskMutationHookResult = ReturnType<typeof useUpdateTaskMutation>;
export type UpdateTaskMutationResult = Apollo.MutationResult<UpdateTaskMutation>;
export type UpdateTaskMutationOptions = Apollo.BaseMutationOptions<UpdateTaskMutation, UpdateTaskMutationVariables>;
export const DeleteTaskDocument = gql`
    mutation deleteTask($id: Int!) {
  deleteOneTask(where: {id: $id}) {
    id
  }
}
    `;
export type DeleteTaskMutationFn = Apollo.MutationFunction<DeleteTaskMutation, DeleteTaskMutationVariables>;

/**
 * __useDeleteTaskMutation__
 *
 * To run a mutation, you first call `useDeleteTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskMutation, { data, loading, error }] = useDeleteTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTaskMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTaskMutation, DeleteTaskMutationVariables>) {
        return Apollo.useMutation<DeleteTaskMutation, DeleteTaskMutationVariables>(DeleteTaskDocument, baseOptions);
      }
export type DeleteTaskMutationHookResult = ReturnType<typeof useDeleteTaskMutation>;
export type DeleteTaskMutationResult = Apollo.MutationResult<DeleteTaskMutation>;
export type DeleteTaskMutationOptions = Apollo.BaseMutationOptions<DeleteTaskMutation, DeleteTaskMutationVariables>;
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
export const AddTagToTodosDocument = gql`
    mutation addTagToTodos($id: Int!, $todos: [TodoWhereUniqueInput!]) {
  updateOneTag(where: {id: $id}, data: {todos: {connect: $todos}}) {
    id
    todos {
      id
    }
  }
}
    `;
export type AddTagToTodosMutationFn = Apollo.MutationFunction<AddTagToTodosMutation, AddTagToTodosMutationVariables>;

/**
 * __useAddTagToTodosMutation__
 *
 * To run a mutation, you first call `useAddTagToTodosMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTagToTodosMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTagToTodosMutation, { data, loading, error }] = useAddTagToTodosMutation({
 *   variables: {
 *      id: // value for 'id'
 *      todos: // value for 'todos'
 *   },
 * });
 */
export function useAddTagToTodosMutation(baseOptions?: Apollo.MutationHookOptions<AddTagToTodosMutation, AddTagToTodosMutationVariables>) {
        return Apollo.useMutation<AddTagToTodosMutation, AddTagToTodosMutationVariables>(AddTagToTodosDocument, baseOptions);
      }
export type AddTagToTodosMutationHookResult = ReturnType<typeof useAddTagToTodosMutation>;
export type AddTagToTodosMutationResult = Apollo.MutationResult<AddTagToTodosMutation>;
export type AddTagToTodosMutationOptions = Apollo.BaseMutationOptions<AddTagToTodosMutation, AddTagToTodosMutationVariables>;
export const AddTagsToTodoDocument = gql`
    mutation addTagsToTodo($id: Int!, $tags: [TagWhereUniqueInput!]) {
  updateOneTodo(where: {id: $id}, data: {tags: {connect: $tags}}) {
    id
    tags {
      id
    }
  }
}
    `;
export type AddTagsToTodoMutationFn = Apollo.MutationFunction<AddTagsToTodoMutation, AddTagsToTodoMutationVariables>;

/**
 * __useAddTagsToTodoMutation__
 *
 * To run a mutation, you first call `useAddTagsToTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTagsToTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTagsToTodoMutation, { data, loading, error }] = useAddTagsToTodoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      tags: // value for 'tags'
 *   },
 * });
 */
export function useAddTagsToTodoMutation(baseOptions?: Apollo.MutationHookOptions<AddTagsToTodoMutation, AddTagsToTodoMutationVariables>) {
        return Apollo.useMutation<AddTagsToTodoMutation, AddTagsToTodoMutationVariables>(AddTagsToTodoDocument, baseOptions);
      }
export type AddTagsToTodoMutationHookResult = ReturnType<typeof useAddTagsToTodoMutation>;
export type AddTagsToTodoMutationResult = Apollo.MutationResult<AddTagsToTodoMutation>;
export type AddTagsToTodoMutationOptions = Apollo.BaseMutationOptions<AddTagsToTodoMutation, AddTagsToTodoMutationVariables>;
export const AddCommentDocument = gql`
    mutation addComment($todoId: Int!, $title: String!, $content: String) {
  createOneComment(data: {title: $title, content: $content, todo: {connect: {id: $todoId}}, user: {connect: {id: 1}}}) {
    id
    title
    content
    todo {
      id
    }
    user {
      id
    }
  }
}
    `;
export type AddCommentMutationFn = Apollo.MutationFunction<AddCommentMutation, AddCommentMutationVariables>;

/**
 * __useAddCommentMutation__
 *
 * To run a mutation, you first call `useAddCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCommentMutation, { data, loading, error }] = useAddCommentMutation({
 *   variables: {
 *      todoId: // value for 'todoId'
 *      title: // value for 'title'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useAddCommentMutation(baseOptions?: Apollo.MutationHookOptions<AddCommentMutation, AddCommentMutationVariables>) {
        return Apollo.useMutation<AddCommentMutation, AddCommentMutationVariables>(AddCommentDocument, baseOptions);
      }
export type AddCommentMutationHookResult = ReturnType<typeof useAddCommentMutation>;
export type AddCommentMutationResult = Apollo.MutationResult<AddCommentMutation>;
export type AddCommentMutationOptions = Apollo.BaseMutationOptions<AddCommentMutation, AddCommentMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation deleteComment($id: Int!) {
  deleteOneComment(where: {id: $id}) {
    id
  }
}
    `;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, baseOptions);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const UpdateCommentDocument = gql`
    mutation updateComment($id: Int!, $title: String, $content: String) {
  updateOneComment(where: {id: $id}, data: {title: {set: $title}, content: {set: $content}}) {
    id
    title
    content
  }
}
    `;
export type UpdateCommentMutationFn = Apollo.MutationFunction<UpdateCommentMutation, UpdateCommentMutationVariables>;

/**
 * __useUpdateCommentMutation__
 *
 * To run a mutation, you first call `useUpdateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommentMutation, { data, loading, error }] = useUpdateCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useUpdateCommentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCommentMutation, UpdateCommentMutationVariables>) {
        return Apollo.useMutation<UpdateCommentMutation, UpdateCommentMutationVariables>(UpdateCommentDocument, baseOptions);
      }
export type UpdateCommentMutationHookResult = ReturnType<typeof useUpdateCommentMutation>;
export type UpdateCommentMutationResult = Apollo.MutationResult<UpdateCommentMutation>;
export type UpdateCommentMutationOptions = Apollo.BaseMutationOptions<UpdateCommentMutation, UpdateCommentMutationVariables>;

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
    