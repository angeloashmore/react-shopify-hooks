import { gql } from 'apollo-boost'

import { FragmentCheckout } from './FragmentCheckout'
import { FragmentCheckoutUserError } from './FragmentCheckoutUserError'
import { FragmentUserError } from './FragmentUserError'

export const MutationCheckoutEmailUpdateV2 = gql`
  mutation checkoutEmailUpdateV2($checkoutId: ID!, $email: String!) {
    checkoutEmailUpdateV2(checkoutId: $checkoutId, email: $email) {
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
