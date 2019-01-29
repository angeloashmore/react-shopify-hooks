import { gql } from 'apollo-boost'

import { FragmentCheckout } from './FragmentCheckout'
import { FragmentUserError } from './FragmentUserError'

export const MutationCheckoutGiftCardsAppend = gql`
  mutation checkoutGiftCardsAppend(
    $checkoutId: ID!
    $giftCardCodes: [String!]!
  ) {
    checkoutGiftCardsAppend(
      checkoutId: $checkoutId
      giftCardCodes: $giftCardCodes
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
