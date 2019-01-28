import { gql } from 'apollo-boost'

import { FragmentCollection } from './FragmentCollection'
import { FragmentProduct } from './FragmentProduct'

export const QueryCollectionConnectionWithProducts = gql`
  query(
    $first: Int!
    $query: String
    $sortKey: CollectionSortKeys
    $reverse: Boolean
    $productsFirst: Int!
  ) {
    collections(
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
          ...FragmentCollection
          products(first: $productsFirst) {
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
      }
    }
  }

  ${FragmentCollection}
  ${FragmentProduct}
`
