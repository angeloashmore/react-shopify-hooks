import { curry, get, isEmpty, has } from 'lodash/fp'

// Returns a normalized result from a mutation call to ensure data and errors
// are returned in an expected shape.
export const mutationResultNormalizer = curry(
  (rootPath = '', resourcePath = '', result) => {
    const root = get(['data', rootPath], result)

    // Different mutations use different error names, so normalize to a single
    // name.
    const errors =
      get('checkoutUserErrors', root) ||
      get('customerUserErrors', root) ||
      get('userErrors', root) ||
      []

    // If the resource path is present, return that data. If not, return true
    // if no errors, false otherwise.
    const data = has(resourcePath, root)
      ? get(resourcePath, root)
      : isEmpty(errors)

    return { data, errors }
  }
)
