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
      sharedWith {
        id
      }
    }
  }
`;

export const LIST_QUERY = gql`
  query LIST($id: Int!) {
    list(where: { id: $id }) {
      id
      title
      user {
        id
        username
      }
      sharedWith {
        id
        username
      }
      todos(orderBy: { id: desc }) {
        id
        title
        description
        checked
        tasks(orderBy: { id: asc }) {
          id
          title
          checkedAt
        }
        tags(orderBy: { id: desc }) {
          id
          text
          color
        }
      }
    }
  }
`;

export const USERS_QUERY = gql`
  query USERS {
    users {
      id
      username
    }
  }
`;
