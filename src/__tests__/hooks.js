import React, { useState, useEffect } from 'react'
import { render, cleanup, flushEffects } from 'react-testing-library'

import { createClient } from '../__testutils__/createClient'
import { flushEffectsAndWait } from '../__testutils__/flushEffectsAndWait'

import {
  ShopifyProvider,
  useShopifyCustomerAccessToken,
  useShopifyProduct,
  useShopifyProductVariant,
} from '../index'

afterEach(cleanup)

/***
 * useShopifyProduct
 */
describe('useShopifyProduct', () => {
  test('should fetch product data by ID', async () => {
    const client = createClient({
      mocks: {
        Node: (_, { id }) => ({
          id,
          __typename: 'Product',
        }),
      },
    })

    const Component = () => {
      const { product, loading } = useShopifyProduct('id')
      return loading ? 'loading' : product.__typename
    }

    const { container } = render(
      <ShopifyProvider client={client}>
        <Component />
      </ShopifyProvider>
    )
    expect(container.textContent).toBe('loading')
    await flushEffectsAndWait()
    expect(container.textContent).toBe('Product')
  })
})

/***
 * useShopifyProductVariant
 */
describe('useShopifyProductVariant', () => {
  test('should fetch product variant data by ID', async () => {
    const client = createClient({
      mocks: {
        Node: (_, { id }) => ({
          id,
          __typename: 'ProductVariant',
        }),
      },
    })

    const Component = () => {
      const { productVariant, loading } = useShopifyProductVariant('id')
      return loading ? 'loading' : productVariant.__typename
    }

    const { container } = render(
      <ShopifyProvider client={client}>
        <Component />
      </ShopifyProvider>
    )
    expect(container.textContent).toBe('loading')
    await flushEffectsAndWait()
    expect(container.textContent).toBe('ProductVariant')
  })
})

/***
 * useShopifyCustomerAccessToken
 */
describe.skip('useShopifyCustomerAccessToken', () => {
  test('createCustomerAccessToken should return a new token', async () => {
    const Component = () => {
      const [token, setToken] = useState(null)
      const { createCustomerAccessToken } = useShopifyCustomerAccessToken()

      const effect = async () => {
        const {
          data: { accessToken },
        } = await createCustomerAccessToken('email', 'password')
        setToken(accessToken)
      }

      useEffect(() => {
        effect()
      }, [])

      return token
    }

    const { container } = render(
      <MockProvider>
        <Component />
      </MockProvider>
    )
    await flushEffectsAndWait()
    expect(container.textContent).toBe('Hello World')
  })
})
