import { gql } from 'apollo-boost'

import { FragmentCheckout } from './FragmentCheckout'
import { FragmentUserError } from './FragmentUserError'

export const MutationCheckoutLineItemsReplace = gql`
  mutation($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]!) {
    checkoutLineItemsReplace(checkoutId: $checkoutId, lineItems: $lineItems) {
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
