import { gql } from 'apollo-boost'

import { FragmentCheckout } from './FragmentCheckout'
import { FragmentUserError } from './FragmentUserError'

export const MutationCheckoutGiftCardRemoveV2 = gql`
  mutation checkoutGiftCardRemoveV2(
    $checkoutId: ID!
    $appliedGiftCardId: [String!]!
  ) {
    checkoutGiftCardRemoveV2(
      checkoutId: $checkoutId
      appliedGiftCardId: $appliedGiftCardId
    ) {
      userErrors {
        ...FragmentUserError
      }
      checkout {
        ...FragmentCheckout
      }
    }
  }

  ${FragmentCheckout}
  ${FragmentUserError}
`
