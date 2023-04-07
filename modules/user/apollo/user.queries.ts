import { gql } from '@apollo/client';

export const GET_USERS_QRY = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

export const GET_USER_QRY = gql`
  query getUsers($id: String) {
    user(id: $id) {
      name
      email
      id
    }
  }
`;
