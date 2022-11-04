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

export const UPDATE_USER = gql`
  mutation UpdateProfile(
    $updateProfileId: Int!
    $role: ROLES
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
