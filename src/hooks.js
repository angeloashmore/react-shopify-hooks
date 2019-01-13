import { useContext } from 'react'
import { compose, get, find } from 'lodash/fp'

import { ShopifyContext } from './context'
import { usePromise } from './lib'

export const useShopifyProduct = id => {
  const client = useContext(ShopifyContext)
  const { result, error, isLoading } = usePromise(client.product.fetch(id))

  return { product: result, error, isLoading }
}

export const useShopifyProductVariant = (productId, variantId) => {
  const { product, error, isLoading } = useShopifyProduct(productId)

  return {
    productVariant: compose(
      find(['id', variantId]),
      get('variants')
    )(product),
    error,
    isLoading,
  }
}
