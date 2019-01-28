import { gql } from 'apollo-boost'

import { FragmentCustomer } from './FragmentCustomer'
import { FragmentCustomerAccessToken } from './FragmentCustomerAccessToken'
import { FragmentCustomerUserError } from './FragmentCustomerUserError'
import { FragmentUserError } from './FragmentUserError'

export const MutationCustomerUpdate = gql`
  mutation customerUpdate(
    $customerAccessToken: String!
    $customer: CustomerUpdateInput!
  ) {
    customerUpdate(
      customerAccessToken: $customerAccessToken
      customer: $customer
    ) {
      userErrors {
        ...FragmentUserError
      }
      customer {
        ...FragmentCustomer
      }
      customerAccessToken {
        ...FragmentCustomerAccessToken
      }
      customerUserErrors {
        ...FragmentCustomerUserError
      }
    }
  }

  ${FragmentCustomerAccessToken}
  ${FragmentCustomerUserError}
  ${FragmentCustomer}
  ${FragmentUserError}
`
