import {gql} from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser(
    $email: String!
    $role: ROLES!
    $fcmToken: String
    $firstName: String!
    $lastName: String!
  ) {
    createUser(
      email: $email
      role: $role
      fcmToken: $fcmToken
      firstName: $firstName
      lastName: $lastName
    ) {
      status
      message
      data {
        id
        email
        firstName
        userName
        lastName
        avatar
        dob
        role
        phoneNumber
        country
        city
        createdAt
      }
    }
  }
`;
