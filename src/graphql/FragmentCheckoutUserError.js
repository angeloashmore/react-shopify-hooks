import { gql } from 'apollo-boost'

export const FragmentCheckoutUserError = gql`
  fragment FragmentCheckoutUserError on CheckoutUserError {
    field
    message
    code
  }
`
