import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'
import { SchemaLink } from 'apollo-link-schema'
import { GraphQLString, GraphQLFloat } from 'graphql'

import typeDefs from '../__tests__/fixtures/schema.graphql'

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

export const createSchemaLink = ({ mocks }) => {
  addMockFunctionsToSchema({ schema, mocks })
  return new SchemaLink({ schema })
}
