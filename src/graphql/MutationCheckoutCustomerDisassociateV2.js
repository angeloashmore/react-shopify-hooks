import { gql } from 'apollo-boost'

import { FragmentCheckout } from './FragmentCheckout'
import { FragmentCheckoutUserError } from './FragmentCheckoutUserError'
import { FragmentUserError } from './FragmentUserError'

export const MutationCheckoutCustomerDisassociateV2 = gql`
  mutation mutationCheckoutCustomerDisassociateV2($checkoutId: ID!) {
    checkoutCustomerDisassociateV2(
      checkoutId: $checkoutId
      customerAccessToken: $customerAccessToken
    ) {
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

  ${FragmentCheckoutUserError}
  ${FragmentCheckout}
  ${FragmentUserError}
`
