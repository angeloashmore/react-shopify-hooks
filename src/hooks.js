import { useApolloClient, useQuery } from 'react-apollo-hooks'
import { compose, get, find, merge } from 'lodash/fp'

import { getNodes } from './lib'
import { QueryProductNode } from './graphql/QueryProductNode'

export { useApolloClient as useShopifyApolloClient }

export const useShopifyProduct = (id, options) => {
  const { data, ...rest } = useQuery(
    QueryProductNode,
    merge(options, {
      variables: { id },
    })
  )

  return { product: get('node', data), ...rest }
}

export const useShopifyProductVariant = (productId, variantId, options) => {
  const { product, ...rest } = useShopifyProduct(productId, options)

  return {
    productVariant: compose(
      find(['id', variantId]),
      getNodes,
      get('variants')
    )(product),
    ...rest,
  }
}
