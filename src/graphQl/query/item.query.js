import {gql} from '@apollo/client';

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
  }
`;

export const SEARCH_ITEMS = gql`
  query SearchItem($text: String) {
    searchItem(text: $text) {
      message
      status
      data {
        categoryId
        id
        image
        name
        price
      }
    }
  }
`;
