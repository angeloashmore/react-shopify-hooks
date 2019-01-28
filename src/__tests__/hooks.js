import React, { useState, useEffect } from 'react'
import { render, cleanup, flushEffects, fireEvent } from 'react-testing-library'

import { createClient } from '../__testutils__/createClient'
import { flushEffectsAndWait } from '../__testutils__/flushEffectsAndWait'

import {
  ShopifyProvider,
  useShopifyCheckout,
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
describe('useShopifyCustomerAccessToken', () => {
  test('createCustomerAccessToken should return a new token', async () => {
    const client = createClient()

    const Component = () => {
      const [token, setToken] = useState(null)
      const { createCustomerAccessToken } = useShopifyCustomerAccessToken()

      useEffect(() => {
        createCustomerAccessToken('email', 'password').then(
          ({ data: { accessToken } }) => setToken(accessToken)
        )
      }, [])

      return token
    }

    const { container } = render(
      <ShopifyProvider client={client}>
        <Component />
      </ShopifyProvider>
    )
    await flushEffectsAndWait()
    expect(container.textContent).toBe('Hello World')
  })

  test('renewCustomerAccessToken should return a new token', async () => {
    const client = createClient()

    const Component = () => {
      const [token, setToken] = useState('existing token')
      const { renewCustomerAccessToken } = useShopifyCustomerAccessToken()

      useEffect(() => {
        renewCustomerAccessToken(token).then(({ data: { accessToken } }) =>
          setToken(accessToken)
        )
      }, [])

      return token
    }

    const { container } = render(
      <ShopifyProvider client={client}>
        <Component />
      </ShopifyProvider>
    )
    await flushEffectsAndWait()
    expect(container.textContent).toBe('Hello World')
  })

  test('deleteCustomerAccessToken should return the deleted token', async () => {
    const client = createClient()

    const Component = () => {
      const [token, setToken] = useState('existing token')
      const { deleteCustomerAccessToken } = useShopifyCustomerAccessToken()

      useEffect(() => {
        deleteCustomerAccessToken(token).then(({ data }) => setToken(data))
      }, [])

      return token
    }

    const { container } = render(
      <ShopifyProvider client={client}>
        <Component />
      </ShopifyProvider>
    )
    await flushEffectsAndWait()
    expect(container.textContent).toBe('Hello World')
  })
})

describe('useShopifyCheckout', () => {
  test('should not return a checkout if ID is not provided', async () => {
    const client = createClient()

    const Component = () => {
      const { checkout, loading } = useShopifyCheckout()
      return loading ? 'loading' : checkout ? 'has checkout' : 'no checkout'
    }

    const { container } = render(
      <ShopifyProvider client={client}>
        <Component />
      </ShopifyProvider>
    )
    expect(container.textContent).toBe('no checkout')
  })

  test('should return checkout if ID is provided', async () => {
    const client = createClient({
      mocks: {
        Node: (_, { id }) => ({
          id,
          __typename: 'Checkout',
        }),
      },
    })

    const Component = () => {
      const { checkout, loading } = useShopifyCheckout('id')
      return loading ? 'loading' : checkout.__typename
    }

    const { container } = render(
      <ShopifyProvider client={client}>
        <Component />
      </ShopifyProvider>
    )
    expect(container.textContent).toBe('loading')
    await flushEffectsAndWait()
    expect(container.textContent).toBe('Checkout')
  })

  describe('actions', () => {
    test('createCheckout should return a new checkout', async () => {
      const client = createClient({
        mocks: {
          Node: (_, { id }) => ({
            id,
            __typename: 'Checkout',
          }),
        },
      })

      const Component = () => {
        const [checkoutId, setCheckoutId] = useState(null)
        const {
          checkout,
          loading,
          actions: { createCheckout },
        } = useShopifyCheckout(checkoutId)

        useEffect(() => {
          createCheckout().then(({ data }) => setCheckoutId(data.id))
        }, [])

        if (!checkout) return 'no checkout'

        return loading ? 'loading' : checkout.__typename
      }

      const { container } = render(
        <ShopifyProvider client={client}>
          <Component />
        </ShopifyProvider>
      )
      expect(container.textContent).toBe('no checkout')
      await flushEffectsAndWait()
      expect(container.textContent).toBe('Checkout')
    })

    test('attributesUpdate should return the updated checkout', async () => {
      const client = createClient({
        mocks: {
          Node: (_, { id }) => ({
            id,
            __typename: 'Checkout',
          }),
        },
      })

      const Component = () => {
        const [data, setData] = useState(null)
        const {
          checkout,
          loading,
          actions: { attributesUpdate },
        } = useShopifyCheckout('id')

        useEffect(() => {
          attributesUpdate({ note: 'note' }).then(({ data }) => setData(data))
        }, [])

        return loading ? 'loading' : data ? data.__typename : null
      }

      const { container } = render(
        <ShopifyProvider client={client}>
          <Component />
        </ShopifyProvider>
      )

      expect(container.textContent).toBe('loading')
      await flushEffectsAndWait()
      expect(container.textContent).toBe('Checkout')
    })

    test('customerAssociate should return the updated checkout', async () => {
      const client = createClient({
        mocks: {
          Node: (_, { id }) => ({
            id,
            __typename: 'Checkout',
          }),
        },
      })

      const Component = () => {
        const [data, setData] = useState(null)
        const {
          checkout,
          loading,
          actions: { customerAssociate },
        } = useShopifyCheckout('id')

        useEffect(() => {
          customerAssociate('token').then(({ data }) => setData(data))
        }, [])

        return loading ? 'loading' : data ? data.__typename : null
      }

      const { container } = render(
        <ShopifyProvider client={client}>
          <Component />
        </ShopifyProvider>
      )

      expect(container.textContent).toBe('loading')
      await flushEffectsAndWait()
      expect(container.textContent).toBe('Checkout')
    })
  })
})
