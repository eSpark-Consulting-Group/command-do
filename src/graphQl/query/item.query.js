import { gql } from "@apollo/client";

export const GET_ALL_ITEMS = gql`
query GetAllItems($where: where) {
  getAllItems(where: $where) {
    status
    message
    data {
      id
      name
      image
      price
      categoryId
      Category {
        id
        name
      }
    }
    error
  }
}`