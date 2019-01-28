import { gql } from 'apollo-boost'

import { FragmentCustomerUserError } from './FragmentCustomerUserError'
import { FragmentMailingAddress } from './FragmentMailingAddress'
import { FragmentUserError } from './FragmentUserError'

export const MutationCustomerAddressUpdate = gql`
  mutation customerAddressUpdate(
    $customerAccessToken: String!
    $id: ID!
    $address: MailingAddressInput!
  ) {
    customerAddressUpdate(
      customerAccessToken: $customerAccessToken
      id: $id
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
