import { gql } from '@apollo/client';

export const createList = gql`
  mutation createList($title: String!) {
    createOneList(data: { title: $title }) {
      id
      title
    }
  }
`;

export const updateList = gql`
  mutation updateList($id: Int!, $title: String) {
    updateOneList(where: { id: $id }, data: { title: { set: $title } }) {
      id
      title
    }
  }
`;
