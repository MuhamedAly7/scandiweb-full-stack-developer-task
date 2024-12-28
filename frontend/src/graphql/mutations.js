import { gql } from "@apollo/client";

export const PLACE_ORDER = gql`
  mutation insertOrder($order: Order!) {
    insertOrder(order: $order)
  }
`;
