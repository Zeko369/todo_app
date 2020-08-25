import { gql } from '@apollo/client';

export const LISTS_QUERY = gql`
  query LISTS {
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

export const LIST_QUERY = gql`
  query LIST($id: Int!) {
    list(where: { id: $id }) {
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

export const createList = gql`
  mutation createList($title: String) {
    createOneList(data: { title: $title }) {
      id
      title
    }
  }
`;

export const updateList = gql`
  mutation updateList($id: Int!, $title: String) {
    updateOneList(where: { id: $id }, data: { title: $title }) {
      id
      title
    }
  }
`;

export const TODOS_QUERY = gql`
  query TODOS {
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
