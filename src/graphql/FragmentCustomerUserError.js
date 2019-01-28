import { gql } from 'apollo-boost'

export const FragmentCustomerUserError = gql`
  fragment FragmentCustomerUserError on CustomerUserError {
    field
    message
    code
  }
`
