import { gql } from 'apollo-boost'

import { FragmentProductVariant } from './FragmentProductVariant'

export const FragmentProductVariantWithProduct = gql`
  fragment FragmentProductVariantWithProduct on ProductVariant {
    ...FragmentProductVariant
    product {
      id
    }
  }

  ${FragmentProductVariant}
`
