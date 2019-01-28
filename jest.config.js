module.exports = {
  modulePathIgnorePatterns: ['fixtures'],
  transform: {
    '\\.(gql|graphql)$': 'jest-transform-graphql',
    '.*': 'babel-jest',
  },
}
