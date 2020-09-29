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

export const updateNote = gql`
  mutation updateNote($id: Int!, $title: String!, $description: String!) {
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
