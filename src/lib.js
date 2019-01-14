import { compose, get, map } from 'lodash/fp'

// Returns an array of nodes from the connection data provided as a result of a
// GraphQL query.
export const getNodes = compose(
  map('node'),
  get('edges')
)
