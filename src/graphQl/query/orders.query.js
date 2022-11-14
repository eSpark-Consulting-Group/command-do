import {gql} from '@apollo/client';

export const ALL_ORDERS = gql`
  query GetAllOrders($getOrderInput: GetOrderInput) {
    getAllOrders(GetOrderInput: $getOrderInput) {
      data {
        id
        totalAmount
        User {
          firstName
          lastName
          id
        }
        status
        paidAmount
        remainingAmount
        OrderItems {
          Item {
            name
            price
            id
          }
          quantity
        }
        createdAt
      }
      status
      message
    }
  }
`;
