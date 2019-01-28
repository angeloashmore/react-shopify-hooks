import { gql } from 'apollo-boost'

import { FragmentProduct } from './FragmentProduct'

export const FragmentCollectionsProducts = gql`
  fragment FragmentCollectionsProducts on CollectionsProducts {
    products(first: 20) {
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
