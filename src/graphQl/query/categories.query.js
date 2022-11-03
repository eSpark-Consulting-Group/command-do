import { gql } from "@apollo/client";

export const GET_ALL_CATEGORIES = gql`
query GetAllCategories {
  getAllCategories {
    status
    message
    data {
      image
      name
      id
    }
  }
}`

export const GET_ALL_CATEGORIES_WITH_ITEMS = gql`
query GetAllCategories {
  getAllCategories {
    status
    message
    data {
      image
      name
      id
      Item {
        id
        name
        price
        image
      }
    }
  }
}`