import { gql } from '@apollo/client';

export const createNote = gql`
  mutation createNote($title: String!, $description: String!) {
    createOneTodo(data: { title: $title, description: $description, type: NOTE }) {
      id
      title
      description
    }
  }
`;
