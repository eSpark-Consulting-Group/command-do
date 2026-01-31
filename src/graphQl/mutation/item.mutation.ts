import {gql} from '@apollo/client';

export const ADD_ITEM = gql`
  mutation AddNewItem(
    $name: String!
    $image: String!
    $price: Int!
    $categoryId: Int!
  ) {
    addNewItem(
      name: $name
      image: $image
      price: $price
      categoryId: $categoryId
    ) {
      status
      message
    }
  }
`;
export const UPDATE_ITEM = gql`
  mutation UpdateItem(
    $updateItemId: Int!
    $name: String
    $image: String
    $price: Int
    $categoryId: Int
  ) {
    updateItem(
      id: $updateItemId
      name: $name
      image: $image
      price: $price
      categoryId: $categoryId
    ) {
      status
      message
    }
  }
`;
export const DELETE_ITEM = gql`
  mutation DeleteItem($deleteItemId: Int!) {
    deleteItem(id: $deleteItemId) {
      status
      message
    }
  }
`;
