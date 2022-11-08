import { gql } from "@apollo/client";

export const PLACE_ORDER = gql`
mutation CreateOrder($input: OrderInput!) {
  createOrder(input: $input) {
    status
    message
  }
}`