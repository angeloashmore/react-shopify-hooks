import { gql } from 'apollo-boost'

import { FragmentCustomer } from './FragmentCustomer'
import { FragmentCustomerAccessToken } from './FragmentCustomerAccessToken'
import { FragmentCustomerUserError } from './FragmentCustomerUserError'
import { FragmentUserError } from './FragmentUserError'

export const MutationCustomerActivate = gql`
  mutation($id: ID!, $input: CustomerActivateInput!) {
    customerActivate(id: $id, input: $input) {
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
