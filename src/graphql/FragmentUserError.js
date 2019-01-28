import { gql } from 'apollo-boost'

export const FragmentUserError = gql`
  fragment FragmentUserError on UserError {
    field
    message
  }
`
