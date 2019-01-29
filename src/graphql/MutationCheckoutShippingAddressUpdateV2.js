import { gql } from 'apollo-boost'

import { FragmentCheckout } from './FragmentCheckout'
import { FragmentUserError } from './FragmentUserError'

export const MutationCheckoutShippingAddressUpdateV2 = gql`
  mutation($checkoutId: ID!, $shippingAddress: MailingAddressInput!) {
    checkoutShippingAddressUpdateV2(
      checkoutId: $checkoutId
      shippingAddress: $shippingAddress
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
