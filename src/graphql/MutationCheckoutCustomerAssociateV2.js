import { gql } from 'apollo-boost'

import { FragmentCheckout } from './FragmentCheckout'
import { FragmentCheckoutUserError } from './FragmentCheckoutUserError'
import { FragmentCustomer } from './FragmentCustomer'
import { FragmentUserError } from './FragmentUserError'

export const MutationCheckoutCustomerAssociateV2 = gql`
  mutation mutationCheckoutCustomerAssociateV2(
    $checkoutId: ID!
    $customerAccessToken: String!
  ) {
    checkoutCustomerAssociateV2(
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
      customer {
        ...FragmentCustomer
      }
    }
  }

  ${FragmentCheckoutUserError}
  ${FragmentCheckout}
  ${FragmentCustomer}
  ${FragmentUserError}
`
