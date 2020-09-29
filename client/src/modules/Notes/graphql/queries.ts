import { gql } from '@apollo/client';

export const NOTES_QUERY = gql`
  query Notes {
    todos(orderBy: { id: desc }, where: { type: NOTE }) {
      id
      title
      description
    }
  }
`;
