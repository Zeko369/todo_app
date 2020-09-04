import { gql } from '@apollo/client';

export const createTag = gql`
  mutation createTag($text: String!, $color: String) {
    createOneTag(data: { text: $text, color: $color }) {
      id
      text
    }
  }
`;

export const updateTag = gql`
  mutation updateTag($id: Int!, $text: String, $color: String) {
    updateOneTag(where: { id: $id }, data: { text: { set: $text }, color: { set: $color } }) {
      id
      text
    }
  }
`;

export const deleteTag = gql`
  mutation deleteTag($id: Int!) {
    deleteOneTag(where: { id: $id }) {
      id
    }
  }
`;
