import { gql } from 'apollo-boost'

import { FragmentCustomer } from './FragmentCustomer'
import { FragmentCustomerAccessToken } from './FragmentCustomerAccessToken'
import { FragmentCustomerUserError } from './FragmentCustomerUserError'
import { FragmentUserError } from './FragmentUserError'

export const MutationCustomerReset = gql`
  mutation customerReset($id: ID!, $input: CustomerResetInput!) {
    customerReset(id: $id, input: $input) {
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
