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

    // If a resource path is not defined, return undefined since Shopify does
    // not provide any meaningful return data for this mutation.
    const data = resourcePath ? get(resourcePath, root) : undefined

    return { data, errors }
  }
)
