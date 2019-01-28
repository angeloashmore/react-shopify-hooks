import { gql } from 'apollo-boost'

import { FragmentCustomer } from './FragmentCustomer'
import { FragmentCustomerUserError } from './FragmentCustomerUserError'
import { FragmentUserError } from './FragmentUserError'

export const MutationCustomerDefaultAddressUpdate = gql`
  mutation customerDefaultAddressUpdate(
    $customerAccessToken: String!
    $addressId: ID!
  ) {
    customerDefaultAddressUpdate(
      customerAccessToken: $customerAccessToken
      addressId: $addressId
    ) {
      userErrors {
        ...FragmentUserError
      }
      customer {
        ...FragmentCustomer
      }
      customerUserErrors {
        ...FragmentCustomerUserError
      }
    }
  }

  ${FragmentCustomerUserError}
  ${FragmentCustomer}
  ${FragmentUserError}
`
