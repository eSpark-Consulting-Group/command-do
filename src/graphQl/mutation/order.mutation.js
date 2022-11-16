import {gql} from '@apollo/client';

export const PLACE_ORDER = gql`
  mutation CreateOrder($input: OrderInput!) {
    createOrder(input: $input) {
      status
      message
    }
  }
`;

export const UPDATE_ORDER = gql`
  mutation UpdateOrder($input: [updateOrderInput], $type: ORDER_UPDATE) {
    updateOrder(input: $input, type: $type) {
      status
      message
    }
  }
`;
