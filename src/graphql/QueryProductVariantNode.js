import { gql } from 'apollo-boost'

import { FragmentProductVariant } from './FragmentProductVariant'

export const QueryProductVariantNode = gql`
  query($id: ID!) {
    node(id: $id) {
      ...FragmentProductVariant
    }
  }

  ${FragmentProductVariant}
`
