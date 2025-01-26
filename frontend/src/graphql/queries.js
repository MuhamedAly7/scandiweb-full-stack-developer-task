import { gql } from "@apollo/client";

const productFields = `
    id
    name
    inStock
    gallery
    description
    brand
    prices {
        amount
        currency {
            label
            symbol
        }
    }
    category
    attributes {
        id
        name
        type
        items {
            id
            value
            display_value
        }
    }
`;

export const GET_CATEGORIES = gql`
  query {
    categories {
      name
    }
  }
`;

export const GET_PRODUCTS = gql`
    query ($category: String!) {
        products(category: $category) {
            ${productFields}
        }
    }
`;

export const GET_SINGLE_PRODUCT = gql`
  query ($id: String!) {
    product(id: $id) {
        ${productFields}
    }
  }
`;

export const GET_PRODUCT_CATEGORY = gql`
  query GetProductCategory($id: String!) {
    product(id: $id) {
      category
    }
  }
`;
