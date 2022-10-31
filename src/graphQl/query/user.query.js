import {gql} from '@apollo/client';

export const LOGIN_USER = gql`
  query LoginUser($email: String, $password: String, $fcmToken: String) {
    loginUser(email: $email, password: $password, fcmToken: $fcmToken) {
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
      error
    }
  }
`;
