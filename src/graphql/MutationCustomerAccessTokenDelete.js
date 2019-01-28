import { gql } from 'apollo-boost'

import { FragmentUserError } from './FragmentUserError'

export const MutationCustomerAccessTokenDelete = gql`
  mutation($customerAccessToken: String!) {
    customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
      userErrors {
        ...FragmentUserError
      }
      deletedAccessToken
      deletedCustomerAccessTokenId
    }
  }

  ${FragmentUserError}
`
