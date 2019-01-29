import { gql } from 'apollo-boost'

import { FragmentCheckout } from './FragmentCheckout'
import { FragmentUserError } from './FragmentUserError'

export const MutationCheckoutShippingLineUpdate = gql`
  mutation($checkoutId: ID!, $shippingRateHandle: String!) {
    checkoutShippingLineUpdate(
      checkoutId: $checkoutId
      shippingRateHandle: $shippingRateHandle
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
