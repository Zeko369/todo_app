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
      todos(orderBy: { id: desc }) {
        id
        title
        description
        checked
        tags {
          id
          text
          color
        }
      }
    }
  }
`;
