import { gql } from '@apollo/client';

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
