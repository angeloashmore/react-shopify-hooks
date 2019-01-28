import { gql } from 'apollo-boost'

import { FragmentProduct } from './FragmentProduct'

export const QueryProductConnection = gql`
  query(
    $first: Int!
    $query: String
    $sortKey: ProductSortKeys
    $reverse: Boolean
  ) {
    products(
      first: $first
      query: $query
      sortKey: $sortKey
      reverse: $reverse
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          ...FragmentProduct
        }
      }
    }
  }

  ${FragmentProduct}
`
