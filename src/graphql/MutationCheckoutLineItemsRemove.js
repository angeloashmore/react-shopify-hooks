import { gql } from 'apollo-boost'

import { FragmentCheckout } from './FragmentCheckout'
import { FragmentUserError } from './FragmentUserError'

export const MutationCheckoutLineItemsRemove = gql`
  mutation($checkoutId: ID!, $lineItemIds: [ID!]!) {
    checkoutLineItemsRemove(
      checkoutId: $checkoutId
      lineItemIds: $lineItemIds
    ) {
      userErrors {
        ...UserErrorFragment
      }
      checkout {
        ...CheckoutFragment
      }
    }
  }

  ${FragmentCheckout}
  ${FragmentUserError}
`
