import { gql } from 'apollo-boost'

import { FragmentCheckout } from './FragmentCheckout'
import { FragmentCheckoutUserError } from './FragmentCheckoutUserError'
import { FragmentUserError } from './FragmentUserError'

export const MutationCheckoutAttributesUpdateV2 = gql`
  mutation checkoutAttributesUpdateV2(
    $checkoutId: ID!
    $input: CheckoutAttributesUpdateV2Input!
  ) {
    checkoutAttributesUpdateV2(checkoutId: $checkoutId, input: $input) {
      userErrors {
        ...FragmentUserError
      }
      checkoutUserErrors {
        ...FragmentCheckoutUserError
      }
      checkout {
        ...FragmentCheckout
      }
    }
  }

  ${FragmentCheckout}
  ${FragmentCheckoutUserError}
  ${FragmentUserError}
`
