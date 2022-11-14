import {gql} from '@apollo/client';

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
  }
`;

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
  }
`;

export const GET_CATEGORIES_WITH_ID = gql`
  query Query {
    getAllCategories {
      message
      status
      data {
        id
        name
        createdAt
        updatedAt
        Item {
          name
          id
          Category {
            name
          }
          categoryId
        }
      }
    }
  }
`;
