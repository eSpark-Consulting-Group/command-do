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
        userId
        Rider {
          firstName
          lastName
          id
        }
        riderId
        returned
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
export const ORDERS_SUMMARY = gql`
  query GetOrderSummary($date: Date) {
    getOrderSummary(date: $date) {
      status
      totalAmount
      message
      data {
        amount
        item {
          name
          price
        }
        itemId
        quantity
      }
    }
  }
`;
export const ORDERS_PURCHASED = gql`
  query OrderPurchased {
    orderPurchased {
      message
      status
    }
  }
`;
export const COLLECTED_ORDERS = gql`
  query GetCollectedOrder($date: Date) {
    getCollectedOrder(date: $date) {
      data {
        id
        riderId
        summary
        totalAmount
        updatedAt
        Rider {
          lastName
          firstName
        }
        createdAt
      }
      error
      message
      status
    }
  }
`;
