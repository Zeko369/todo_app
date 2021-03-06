import { gql } from '@apollo/client';

export const TODOS_QUERY = gql`
  query TODOS {
    todos(orderBy: [{ pinned: desc }, { id: desc }], where: { type: TODO }) {
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
      tags(orderBy: { id: desc }) {
        id
        text
        color
      }
      tasks(orderBy: { id: asc }) {
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

export const addTask = gql`
  mutation addTask($todoId: Int!, $title: String!) {
    createOneTask(data: { todo: { connect: { id: $todoId } }, title: $title }) {
      id
      title
    }
  }
`;

export const updatePinTodo = gql`
  mutation updatePinTodo($id: Int!, $pinned: Boolean) {
    updateOneTodo(where: { id: $id }, data: { pinned: { set: $pinned } }) {
      id
      pinned
    }
  }
`;

export const checkAllTasks = gql`
  mutation checkAllTasks($todoId: Int, $checkedAt: DateTime) {
    updateManyTask(
      where: { todoId: { equals: $todoId } }
      data: { checkedAt: { set: $checkedAt } }
    ) {
      count
    }
  }
`;

export const TASK_QUERY = gql`
  query TASK($id: Int!) {
    task(where: { id: $id }) {
      id
      title
      checkedAt
    }
  }
`;

export const TODO_QUERY = gql`
  query TODO($id: Int!) {
    todo(where: { id: $id }) {
      id
      tasks {
        id
        title
        checkedAt
      }
    }
  }
`;

export const checkTask = gql`
  mutation checkTask($id: Int!) {
    checkTask(id: $id) {
      id
      checkedAt
      __typename
    }
  }
`;

export const deleteManyTodos = gql`
  mutation deleteManyTodos($ids: [Int!]) {
    deleteManyTodo(where: { id: { in: $ids } }) {
      count
    }
  }
`;

export const removeTagFromTodo = gql`
  mutation removeTagFromTodo($tagId: Int!, $id: Int!) {
    updateOneTodo(where: { id: $id }, data: { tags: { disconnect: { id: $tagId } } }) {
      id
      tags {
        id
      }
    }
  }
`;

export const addTagToTodo = gql`
  mutation addTagToTodo($tagId: Int!, $id: Int!) {
    updateOneTodo(where: { id: $id }, data: { tags: { connect: { id: $tagId } } }) {
      id
      tags {
        id
      }
    }
  }
`;

export const checkTodo = gql`
  mutation checkTodo($id: Int!) {
    checkTodo(id: $id) {
      id
      checked
    }
  }
`;

export const deleteTodo = gql`
  mutation deleteTodo($id: Int!) {
    deleteOneTodo(where: { id: $id }) {
      id
    }
  }
`;

export const createTodo = gql`
  mutation createTodo($title: String!, $description: String) {
    createOneTodo(data: { title: $title, description: $description }) {
      id
      title
      description
    }
  }
`;

export const createTodoWithList = gql`
  mutation createTodoWithList($title: String!, $description: String, $listId: Int) {
    createOneTodo(
      data: { title: $title, description: $description, list: { connect: { id: $listId } } }
    ) {
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

export const updateTodo = gql`
  mutation updateTodo($id: Int!, $title: String, $description: String) {
    updateOneTodo(
      where: { id: $id }
      data: { title: { set: $title }, description: { set: $description } }
    ) {
      id
      title
      description
    }
  }
`;

export const connectTodoToList = gql`
  mutation connectTodoToList($id: Int!, $listId: Int!) {
    updateOneTodo(where: { id: $id }, data: { list: { connect: { id: $listId } } }) {
      id
      title
      description
      list {
        id
      }
    }
  }
`;

export const updateTask = gql`
  mutation updateTask($id: Int!, $title: String) {
    updateOneTask(where: { id: $id }, data: { title: { set: $title } }) {
      id
      title
    }
  }
`;

export const deleteTask = gql`
  mutation deleteTask($id: Int!) {
    deleteOneTask(where: { id: $id }) {
      id
    }
  }
`;

export const removeTodoFromList = gql`
  mutation removeTodoFromList($id: Int!) {
    updateOneTodo(where: { id: $id }, data: { list: { disconnect: true } }) {
      id
      title
      description
    }
  }
`;

export const addTodosToList = gql`
  mutation addTodosToList($todos: [TodoWhereUniqueInput!], $listId: Int!) {
    updateOneList(where: { id: $listId }, data: { todos: { connect: $todos } }) {
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

export const addTagToTodos = gql`
  mutation addTagToTodos($id: Int!, $todos: [TodoWhereUniqueInput!]) {
    updateOneTag(where: { id: $id }, data: { todos: { connect: $todos } }) {
      id
      todos {
        id
      }
    }
  }
`;

export const addTagsToTodo = gql`
  mutation addTagsToTodo($id: Int!, $tags: [TagWhereUniqueInput!]) {
    updateOneTodo(where: { id: $id }, data: { tags: { connect: $tags } }) {
      id
      tags {
        id
      }
    }
  }
`;

export const addComment = gql`
  mutation addComment($todoId: Int!, $title: String!, $content: String) {
    createOneComment(
      data: {
        title: $title
        content: $content
        todo: { connect: { id: $todoId } }
        user: { connect: { id: 1 } }
      }
    ) {
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

export const deleteComment = gql`
  mutation deleteComment($id: Int!) {
    deleteOneComment(where: { id: $id }) {
      id
    }
  }
`;

export const updateComment = gql`
  mutation updateComment($id: Int!, $title: String, $content: String) {
    updateOneComment(
      where: { id: $id }
      data: { title: { set: $title }, content: { set: $content } }
    ) {
      id
      title
      content
    }
  }
`;
