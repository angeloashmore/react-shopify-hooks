import { gql } from 'apollo-boost'

export const FragmentCustomerAccessToken = gql`
  fragment FragmentCustomerAccessToken on CustomerAccessToken {
    accessToken
    expiresAt
  }
`
