import { useQuery } from 'react-apollo-hooks'
import { compose, get, find, merge } from 'lodash/fp'

import { QueryProductNode } from './graphql/QueryProductNode'

export const useShopifyProduct = (id, options) => {
  const { data, ...rest } = useQuery(
    QueryProductNode,
    merge(options, {
      variables: { id },
    })
  )

  return { product: data, ...rest }
}

export const useShopifyProductVariant = (productId, variantId, options) => {
  const { product, ...rest } = useShopifyProduct(productId, options)

  return {
    productVariant: compose(
      find(['id', variantId]),
      get('variants')
    )(product),
    ...rest,
  }
}
