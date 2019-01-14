import { gql } from 'apollo-boost'

import { FragmentProduct } from './FragmentProduct'

export const QueryProductNode = gql`
  query($id: ID!) {
    node(id: $id) {
      ...FragmentProduct
    }
  }

  ${FragmentProduct}
`
