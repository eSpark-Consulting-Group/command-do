import {gql} from '@apollo/client';

export const GET_ALL_ITEMS = gql`
  query GetAllItems($pagination: PaginationInput, $where: where) {
    getAllItems(pagination: $pagination, where: $where) {
      status
      message
      data {
        id
        name
        image
        price
        categoryId
        createdAt
        Category {
          id
          name
        }
      }
      pagination {
        nextCursor
      }
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
        Category {
          id
          name
        }
      }
    }
  }
`;
