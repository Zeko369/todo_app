import { gql } from '@apollo/client';

export const TAGS_QUERY = gql`
  query TAGS {
    tags(orderBy: { id: desc }) {
      id
      text
      color
      todos {
        id
      }
    }
  }
`;
