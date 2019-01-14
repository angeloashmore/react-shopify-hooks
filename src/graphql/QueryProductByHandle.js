import { gql } from 'apollo-boost'

import { FragmentProduct } from './FragmentProduct'

export const QueryProductByHandle = gql`
  query($handle: String!) {
    productByHandle(handle: $handle) {
      ...FragmentProduct
    }
  }

  ${FragmentProduct}
`
