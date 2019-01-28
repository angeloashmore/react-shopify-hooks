import React, { useState, useEffect } from 'react'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { MockLink } from 'apollo-link-mock'
import { render, cleanup, flushEffects } from 'react-testing-library'

import {
  ShopifyProvider,
  useShopifyCustomerAccessToken,
  useShopifyProduct,
  useShopifyProductVariant,
} from './index'

import { MutationCustomerAccessTokenCreate } from './graphql/MutationCustomerAccessTokenCreate'
import { QueryProductNode } from './graphql/QueryProductNode'
import { QueryProductVariantNode } from './graphql/QueryProductVariantNode'

// Helper function to bypass query loading states.
const flushEffectsAndWait = (ms = 20) =>
  new Promise(resolve => {
    flushEffects()
    return setTimeout(resolve, ms)
  })

/***
 * MockProvider
 *
 * ShopifyProvider with a mockable Apollo client.
 */
const MockProvider = ({ mock, mocks, children }) => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new MockLink(mocks || [mock]),
  })

  return <ShopifyProvider client={client}>{children}</ShopifyProvider>
}

afterEach(cleanup)

/***
 * useShopifyProduct
 */
describe('useShopifyProduct', () => {
  test('should fetch product data by ID', async () => {
    const mock = {
      request: {
        query: QueryProductNode,
        variables: {
          id: 'id',
        },
      },
      result: {
        data: {
          node: {
            __typename: 'Product',
            id: 'id',
            availableForSale: true,
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
            descriptionHtml: 'descriptionHtml',
            description: 'description',
            handle: 'handle',
            productType: 'productType',
            title: 'title',
            vendor: 'vendor',
            publishedAt: 'publishedAt',
            onlineStoreUrl: 'onlineStoreUrl',
            options: [],
            images: [],
            variants: [],
          },
        },
      },
    }

    const Component = () => {
      const { product, loading } = useShopifyProduct('id')
      return !loading && product.id
    }

    const { container } = render(
      <MockProvider mock={mock}>
        <Component />
      </MockProvider>
    )
    await flushEffectsAndWait()
    expect(container.textContent).toBe('id')
  })
})

/***
 * useShopifyProductVariant
 */
describe('useShopifyProductVariant', () => {
  test('should fetch product variant data by ID', async () => {
    const mock = {
      request: {
        query: QueryProductVariantNode,
        variables: {
          id: 'id',
        },
      },
      result: {
        data: {
          node: {
            __typename: 'ProductVariant',
            id: 'id',
            title: 'title',
            price: 'price',
            weight: 'weight',
            available: 'available',
            sku: 'sku',
            compareAtPrice: 'compareAtPrice',
            image: {
              __typename: 'Image',
              id: 'id',
              src: 'src',
              altText: 'altText',
            },
            selectedOptions: [],
          },
        },
      },
    }

    const Component = () => {
      const { productVariant, loading } = useShopifyProductVariant('id')
      return !loading && productVariant.id
    }

    const { container } = render(
      <MockProvider mock={mock}>
        <Component />
      </MockProvider>
    )
    await flushEffectsAndWait()
    expect(container.textContent).toBe('id')
  })
})

/***
 * useShopifyCustomerAccessToken
 */
describe('useShopifyCustomerAccessToken', () => {
  test('createCustomerAccessToken should return a new token', async () => {
    const mock = {
      request: {
        query: MutationCustomerAccessTokenCreate,
        variables: {
          input: {
            email: 'email',
            password: 'password',
          },
        },
      },
      result: {
        data: {
          customerAccessTokenCreate: {
            __typename: 'CustomerAccessTokenCreatePayload',
            userErrors: [],
            customerAccessToken: {
              __typename: 'CustomerAccessToken',
              accessToken: 'accessToken',
              expiresAt: 'expiresAt',
            },
            customerUserErrors: [],
          },
        },
      },
    }

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
      <MockProvider mock={mock}>
        <Component />
      </MockProvider>
    )
    await flushEffectsAndWait()
    expect(container.textContent).toBe('accessToken')
  })
})
