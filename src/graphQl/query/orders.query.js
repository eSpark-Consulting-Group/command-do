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

export const ORDERS_BY_DATE = gql`
  query GetOrderOverviewByDate($startDate: Date!, $endDate: Date!) {
    getOrderOverviewByDate(startDate: $startDate, endDate: $endDate) {
      data {
        rider {
          firstName
          lastName
        }
        totalOrders
        totalAmount
        createdAt
      }
      message
      status
    }
  }
`;
