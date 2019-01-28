import { gql } from 'apollo-boost'

import { FragmentCheckout } from './FragmentCheckout'
import { FragmentCheckoutUserError } from './FragmentCheckoutUserError'
import { FragmentUserError } from './FragmentUserError'

export const MutationCheckoutDiscountCodeRemove = gql`
  mutation checkoutDiscountCodeRemove($checkoutId: ID!) {
    checkoutDiscountCodeRemove(checkoutId: $checkoutId) {
      userErrors {
        ...UserErrorFragment
      }
      checkoutUserErrors {
        ...CheckoutUserErrorFragment
      }
      checkout {
        ...CheckoutFragment
      }
    }
  }

  ${FragmentCheckout}
  ${FragmentCheckoutUserError}
  ${FragmentUserError}
`
