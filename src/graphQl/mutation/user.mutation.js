import {gql} from '@apollo/client';

export const CREATE_USER = gql`
  mutation Mutation(
    $firstName: String!
    $lastName: String!
    $email: String!
    $role: [ROLES!]!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      role: $role
    ) {
      message
      status
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateProfile(
    $updateProfileId: Int!
    $role: [ROLES!]
    $firstName: String
    $lastName: String
    $avatar: String
    $dob: Date
    $phoneNumber: String
    $country: String
    $city: String
  ) {
    updateProfile(
      id: $updateProfileId
      role: $role
      firstName: $firstName
      lastName: $lastName
      avatar: $avatar
      dob: $dob
      phoneNumber: $phoneNumber
      country: $country
      city: $city
    ) {
      status
      message
      data {
        id
        email
        firstName
        lastName
        userName
        avatar
        dob
        phoneNumber
        country
        city
        role
        createdAt
        updatedAt
      }
    }
  }
`;

export const EDIT_USER = gql`
  mutation Mutation(
    $updateProfileId: Int!
    $role: [ROLES!]
    $firstName: String
    $lastName: String
  ) {
    updateProfile(
      id: $updateProfileId
      role: $role
      firstName: $firstName
      lastName: $lastName
    ) {
      error
      message
      status
    }
  }
`;

export const DELETE_USER = gql`
  mutation Mutation($deleteUserId: Int!) {
    deleteUser(id: $deleteUserId) {
      message
      status
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

export const FORGOT_PASS = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email) {
      message
      status
      data {
        firstName
        lastName
      }
      error
    }
  }
`;

export const OTP_VERIFY = gql`
  mutation VerifyOtp($token: String!, $email: String!) {
    verifyOtp(token: $token, email: $email) {
      status
      message
      error
    }
  }
`;

export const RESEND_OTP = gql`
  mutation ResendOtp($email: String!) {
    resendOtp(email: $email) {
      message
      status
      error
    }
  }
`;

export const RESET_PASS = gql`
  mutation ResetPassword($email: String!, $newPassword: String!) {
    resetPassword(email: $email, newPassword: $newPassword) {
      status
      message
      error
    }
  }
`;
