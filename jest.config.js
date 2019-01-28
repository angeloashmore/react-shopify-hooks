module.exports = {
  modulePathIgnorePatterns: ['fixtures', 'utils'],
  transform: {
    '\\.(gql|graphql)$': 'jest-transform-graphql',
    '.*': 'babel-jest',
  },
}
