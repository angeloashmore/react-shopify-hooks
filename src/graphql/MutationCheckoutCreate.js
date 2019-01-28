import { gql } from 'apollo-boost'

import { FragmentCheckout } from './FragmentCheckout'
import { FragmentCheckoutUserError } from './FragmentCheckoutUserError'
import { FragmentUserError } from './FragmentUserError'

export const MutationCheckoutCreate = gql`
  mutation($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
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
