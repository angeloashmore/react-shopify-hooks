import { gql } from 'apollo-boost'

import { FragmentCustomer } from './FragmentCustomer'

export const QueryCustomer = gql`
  query($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      ...FragmentCustomer
    }
  }

  ${FragmentCustomer}
`
