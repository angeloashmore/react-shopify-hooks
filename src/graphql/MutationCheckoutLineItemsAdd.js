import { gql } from 'apollo-boost'

import { FragmentCheckout } from './FragmentCheckout'
import { FragmentUserError } from './FragmentUserError'

export const MutationCheckoutLineItemsAdd = gql`
  mutation($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]!) {
    checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
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
