import ApolloClient from 'apollo-client'
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory'

import { createSchemaLink } from '../__testutils__/createSchemaLink'
import introspectionQueryResultData from '../__tests__/fixtures/fragmentTypes.json'

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
})

/***
 * createClient
 *
 * Creates an Apollo client with the provided mocks added to the schema link.
 */
export const createClient = (options = {}) =>
  new ApolloClient({
    cache: new InMemoryCache({ fragmentMatcher }),
    link: createSchemaLink({ mocks: options.mocks }),
  })
