import { gql } from 'apollo-boost'

import { FragmentCustomerUserError } from './FragmentCustomerUserError'
import { FragmentMailingAddress } from './FragmentMailingAddress'
import { FragmentUserError } from './FragmentUserError'

export const MutationCustomerAddressCreate = gql`
  mutation customerAddressCreate(
    $customerAccessToken: String!
    $address: MailingAddressInput!
  ) {
    customerAddressCreate(
      customerAccessToken: $customerAccessToken
      address: $address
    ) {
      userErrors {
        ...FragmentUserError
      }
      customerAddress {
        ...FragmentMailingAddress
      }
      customerUserErrors {
        ...FragmentCustomerUserError
      }
    }
  }

  ${FragmentCustomerUserError}
  ${FragmentMailingAddress}
  ${FragmentUserError}
`
