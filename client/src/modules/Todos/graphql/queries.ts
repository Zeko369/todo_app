import { gql } from '@apollo/client';

export const TODOS_QUERY = gql`
  query TODOS {
    todos(orderBy: { id: desc }) {
      id
      title
      description
      checked
      createdAt
      tags(orderBy: { id: desc }) {
        id
        text
        color
      }
      list {
        id
      }
      tasks(orderBy: { id: desc }) {
        id
        title
        checkedAt
      }
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
      }
    }
  }
`;

export const updateTodo = gql`
  mutation updateTodo($id: Int!, $title: String, $description: String, $listId: Int) {
    updateOneTodo(
      where: { id: $id }
      data: { title: $title, description: $description, list: { connect: { id: $listId } } }
    ) {
      id
      title
      description
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
