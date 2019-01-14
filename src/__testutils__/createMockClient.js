import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { MockLink, MockedResponse } from 'apollo-link-mock'

export const createMockClient = ({
  link,
  mocks = [],
  addTypename = true,
} = {}) =>
  new ApolloClient({
    cache: new InMemoryCache({ addTypename }),
    link: link ? link : new MockLink(mocks),
  })
