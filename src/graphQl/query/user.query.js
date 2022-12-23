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
  query GetUserById($getUserByIdId: Int) {
    getUserById(id: $getUserByIdId) {
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

export const CHANGE_PASS = gql`
  mutation ChangePassword(
    $currentPassword: String!
    $newPassword: String!
    $changePasswordId: Int!
  ) {
    changePassword(
      currentPassword: $currentPassword
      newPassword: $newPassword
      id: $changePasswordId
    ) {
      status
      message
      data {
        password
        id
        email
        firstName
        lastName
        avatar
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
