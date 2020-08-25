import { gql } from '@apollo/client';

export const LISTS_QUERY = gql`
  query Lists {
    lists(orderBy: { id: desc }) {
      id
      title
      todos(last: 5) {
        id
        title
      }
    }
  }
`;

export const TODOS_QUERY = gql`
  query Todos {
    todos(orderBy: { id: desc }) {
      id
      title
      description
      checked
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

export const updateTodo = gql`
  mutation updateTodo($id: Int!, $title: String, $description: String) {
    updateOneTodo(where: { id: $id }, data: { title: $title, description: $description }) {
      id
      title
      description
    }
  }
`;
