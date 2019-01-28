import { gql } from 'apollo-boost'

import { FragmentCheckout } from './FragmentCheckout'

export const QueryCheckoutNode = gql`
  query($id: ID!) {
    node(id: $id) {
      ...FragmentCheckout
    }
  }

  ${FragmentCheckout}
`
