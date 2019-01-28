import { gql } from 'apollo-boost'

import { FragmentMailingAddress } from './FragmentMailingAddress'
import { FragmentOrder } from './FragmentOrder'

export const FragmentCustomer = gql`
  fragment FragmentCustomer on Customer {
    acceptsMarketing
    addresses(first: 250) {
      edges {
        cursor
        node {
          ...FragmentMailingAddress
        }
      }
    }
    createdAt
    defaultAddress {
      ...FragmentMailingAddress
    }
    displayName
    email
    firstName
    id
    lastIncompleteCheckout {
      id
    }
    lastName
    orders(first: 250) {
      edges {
        cursor
        node {
          ...FragmentOrder
        }
      }
    }
    phone
    tags
    updatedAt
  }

  ${FragmentMailingAddress}
  ${FragmentOrder}
`
