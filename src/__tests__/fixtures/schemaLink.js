import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'
import { SchemaLink } from 'apollo-link-schema'
import { GraphQLString, GraphQLFloat } from 'graphql'

import typeDefs from './schema.graphql'

const resolvers = {
  DateTime: GraphQLString,
  Decimal: GraphQLFloat,
  HTML: GraphQLString,
  Money: GraphQLString,
  URL: GraphQLString,
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
})

const mocks = {
  Node: (_, { id }) => ({
    id,
    __typename: 'Product',
  }),
}

addMockFunctionsToSchema({ schema, mocks })

export const schemaLink = new SchemaLink({ schema })
