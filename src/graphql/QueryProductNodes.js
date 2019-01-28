import { gql } from 'apollo-boost'

import { FragmentProduct } from './FragmentProduct'

export const QueryProductNodes = gql`
  query($ids: [ID!]!) {
    nodes(ids: $ids) {
      ...FragmentProduct
    }
  }

  ${FragmentProduct}
`
