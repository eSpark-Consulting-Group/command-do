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

export const GET_ALL_USERS = gql`
  query Query {
    getAllUsers {
      message
      data {
        alphabet
        record {
          id
          firstName
          lastName
        }
      }
    }
  }
`;

export const GET_USER_DETAIL = gql`
  query Query($id: Int) {
    getUserById(id: $id) {
      message
      status
      error
      data {
        firstName
        lastName
        email
        role
      }
    }
  }
`;

export const GET_CURRENT_REMAINING_AMOUNT = gql`
  query GetCurrentRemainingAmount($userId: Int!) {
    getCurrentRemainingAmount(userId: $userId) {
      data {
        id
        paidAmount
        remainingAmount
        totalAmount
        userId
      }
      error
      message
      status
    }
  }
`;
