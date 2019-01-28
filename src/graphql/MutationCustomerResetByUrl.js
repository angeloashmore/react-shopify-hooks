import { gql } from 'apollo-boost'

import { FragmentCustomer } from './FragmentCustomer'
import { FragmentCustomerAccessToken } from './FragmentCustomerAccessToken'
import { FragmentCustomerUserError } from './FragmentCustomerUserError'
import { FragmentUserError } from './FragmentUserError'

export const MutationCustomerResetByUrl = gql`
  mutation customerResetByUrl($resetUrl: URL!, $password: String!) {
    customerResetByUrl(resetUrl: $resetUrl, password: $password) {
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
