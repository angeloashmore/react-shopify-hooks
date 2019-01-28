import React, { useState, useEffect } from 'react'
import ApolloClient from 'apollo-client'
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory'
import { render, cleanup, flushEffects } from 'react-testing-library'

import { schemaLink } from './fixtures/schemaLink'

import {
  ShopifyProvider,
  useShopifyCustomerAccessToken,
  useShopifyProduct,
  useShopifyProductVariant,
} from '../index'

// Helper function to bypass query loading states.
const flushEffectsAndWait = (ms = 20) =>
  new Promise(resolve => {
    flushEffects()
    return setTimeout(resolve, ms)
  })

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [
        {
          kind: 'INTERFACE',
          name: 'Node',
          possibleTypes: [
            { name: 'AppliedGiftCard' },
            { name: 'Article' },
            { name: 'Blog' },
            { name: 'Checkout' },
            { name: 'CheckoutLineItem' },
            { name: 'Collection' },
            { name: 'Comment' },
            { name: 'MailingAddress' },
            { name: 'Order' },
            { name: 'Page' },
            { name: 'Payment' },
            { name: 'Product' },
            { name: 'ProductOption' },
            { name: 'ProductVariant' },
            { name: 'ShopPolicy' },
          ],
        },
        {
          kind: 'INTERFACE',
          name: 'DiscountApplication',
          possibleTypes: [
            { name: 'AutomaticDiscountApplication' },
            { name: 'DiscountCodeApplication' },
            { name: 'ManualDiscountApplication' },
            { name: 'ScriptDiscountApplication' },
          ],
        },
        {
          kind: 'UNION',
          name: 'PricingValue',
          possibleTypes: [
            { name: 'PricingPercentageValue' },
            { name: 'MoneyV2' },
          ],
        },
        {
          kind: 'INTERFACE',
          name: 'DisplayableError',
          possibleTypes: [
            { name: 'CheckoutUserError' },
            { name: 'CustomerUserError' },
            { name: 'UserError' },
          ],
        },
      ],
    },
  },
})

/***
 * MockProvider
 *
 * ShopifyProvider with a mockable Apollo client.
 */
const MockProvider = ({ children }) => {
  const client = new ApolloClient({
    cache: new InMemoryCache({ fragmentMatcher }),
    link: schemaLink,
  })

  return <ShopifyProvider client={client}>{children}</ShopifyProvider>
}

afterEach(cleanup)

/***
 * useShopifyProduct
 */
describe('useShopifyProduct', () => {
  test('should fetch product data by ID', async () => {
    const Component = () => {
      const { product, loading } = useShopifyProduct('id')
      return !loading && product.__typename
    }

    const { container } = render(
      <MockProvider>
        <Component />
      </MockProvider>
    )
    await flushEffectsAndWait()
    expect(container.textContent).toBe('Product')
  })
})

/***
 * useShopifyProductVariant
 */
describe('useShopifyProductVariant', () => {
  test('should fetch product variant data by ID', async () => {
    const Component = () => {
      const { productVariant, loading } = useShopifyProductVariant('id')
      return !loading && productVariant.__typename
    }

    const { container } = render(
      <MockProvider>
        <Component />
      </MockProvider>
    )
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
