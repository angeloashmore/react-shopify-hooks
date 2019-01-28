import ApolloClient from 'apollo-client'
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory'

import { createSchemaLink } from '../fixtures/schemaLink'
import introspectionQueryResultData from '../fixtures/fragmentTypes.json'

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
})

/***
 * createClient
 *
 * Creates an Apollo client with the provided mocks added to the schema link.
 */
export const createClient = ({ mocks }) =>
  new ApolloClient({
    cache: new InMemoryCache({ fragmentMatcher }),
    link: createSchemaLink({ mocks }),
  })
