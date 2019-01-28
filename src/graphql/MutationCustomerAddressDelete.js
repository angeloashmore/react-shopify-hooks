import { gql } from 'apollo-boost'

import { FragmentCustomerUserError } from './FragmentCustomerUserError'
import { FragmentUserError } from './FragmentUserError'

export const MutationCustomerAddressDelete = gql`
  mutation customerAddressDelete($id: ID!, $customerAccessToken: String!) {
    customerAddressDelete(id: $id, customerAccessToken: $customerAccessToken) {
      userErrors {
        ...FragmentUserError
      }
      customerUserErrors {
        ...FragmentCustomerUserError
      }
      deletedCustomerAddressId
    }
  }

  ${FragmentCustomerUserError}
  ${FragmentUserError}
`
