import { gql } from 'apollo-boost'

import { FragmentCollection } from './FragmentCollection'

export const QueryCollectionNode = gql`
  query($id: ID!) {
    node(id: $id) {
      ...CollectionFragment
    }
  }

  ${FragmentCollection}
`
