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

export const shareListWithUser = gql`
  mutation shareListWithUser($userId: Int!, $listId: Int!) {
    updateOneList(where: { id: $listId }, data: { sharedWith: { connect: { id: $userId } } }) {
      id
      sharedWith {
        id
      }
    }
  }
`;

export const disconnectListWithUser = gql`
  mutation disconnectListWithUser($userId: Int!, $listId: Int!) {
    updateOneList(where: { id: $listId }, data: { sharedWith: { disconnect: { id: $userId } } }) {
      id
      sharedWith {
        id
      }
    }
  }
`;
