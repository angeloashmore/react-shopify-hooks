import { gql } from 'apollo-boost'

import { FragmentCollection } from './FragmentCollection'
import { FragmentCollectionsProducts } from './FragmentCollectionsProducts'

export const QueryCollectionNodeWithProductsQuery = gql`
  query($id: ID!) {
    node(id: $id) {
      ...FragmentCollection
      ...FragmentCollectionsProducts
    }
  }

  ${FragmentCollection}
  ${FragmentCollectionsProducts}
`
