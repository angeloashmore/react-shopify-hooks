import { gql } from 'apollo-boost'

import { FragmentProductVariant } from './FragmentProductVariant'

export const FragmentProduct = gql`
  fragment FragmentProduct on Product {
    id
    availableForSale
    createdAt
    updatedAt
    descriptionHtml
    description
    handle
    productType
    title
    vendor
    publishedAt
    onlineStoreUrl
    options {
      name
      values
    }
    images(first: 250) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          id
          src
          altText
        }
      }
    }
    variants(first: 250) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          ...FragmentProductVariant
        }
      }
    }
  }

  ${FragmentProductVariant}
`
