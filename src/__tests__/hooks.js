import React, { useState, useEffect } from 'react'
// import { render, cleanup, flushEffects, fireEvent } from 'react-testing-library'
import { renderHook, cleanup, act } from 'react-hooks-testing-library'

import { createClient } from '../__testutils__/createClient'
import { flushEffectsAndWait } from '../__testutils__/flushEffectsAndWait'
import { testCheckoutAction } from '../__testutils__/testCheckoutAction'
import { testCustomerActionToken } from '../__testutils__/testCustomerActionToken'

import {
  ShopifyProvider,
  useShopifyCheckout,
  useShopifyCustomer,
  useShopifyCustomerAccessToken,
  useShopifyProduct,
  useShopifyProductVariant,
} from '../index'

afterEach(cleanup)

const defaultClient = createClient()

// Returns a client with Node mocked to the provided typename.
const clientWithNodeMock = typename =>
  createClient({
    mocks: {
      Node: (_, { id }) => ({
        id,
        __typename: typename,
      }),
    },
  })

// Helper function that runs renderHook with ShopifyProvider using the provided client.
const renderHookWithClient = (callback, client = defaultClient) =>
  renderHook(callback, {
    wrapper: props => <ShopifyProvider client={client} {...props} />,
  })

/***
 * useShopifyProduct
 */
describe('useShopifyProduct', () => {
  test('should fetch product data by ID', async () => {
    const { result, waitForNextUpdate } = renderHookWithClient(
      () => useShopifyProduct('id'),
      clientWithNodeMock('Product')
    )

    expect(result.current.loading).toBe(true)

    await waitForNextUpdate()

    expect(result.current.loading).toBe(false)
    expect(result.current.product.__typename).toBe('Product')
  })
})

/***
 * useShopifyProductVariant
 */
describe('useShopifyProductVariant', () => {
  test('should fetch product variant data by ID', async () => {
    const { result, waitForNextUpdate } = renderHookWithClient(
      () => useShopifyProduct('id'),
      clientWithNodeMock('ProductVariant')
    )

    expect(result.current.loading).toBe(true)

    await waitForNextUpdate()

    expect(result.current.loading).toBe(false)
    expect(result.current.product.__typename).toBe('ProductVariant')
  })
})

/***
 * useShopifyCustomerAccessToken
 */
describe('useShopifyCustomerAccessToken', () => {
  test('createCustomerAccessToken should return a new token', async () => {
    const { result } = renderHookWithClient(() =>
      useShopifyCustomerAccessToken()
    )

    const {
      data: { accessToken },
    } = await result.current.createCustomerAccessToken('email', 'password')

    expect(accessToken).toBe('Hello World')
  })

  test('renewCustomerAccessToken should return a new token', async () => {
    const { result } = renderHookWithClient(() =>
      useShopifyCustomerAccessToken()
    )

    const {
      data: { accessToken },
    } = await result.current.renewCustomerAccessToken('existingToken')

    expect(accessToken).toBe('Hello World')
  })

  test('deleteCustomerAccessToken should return the deleted token', async () => {
    const { result } = renderHookWithClient(() =>
      useShopifyCustomerAccessToken()
    )

    const {
      data: accessToken,
    } = await result.current.deleteCustomerAccessToken('Hello World')

    expect(accessToken).toBe('Hello World')
  })
})

describe('useShopifyCheckout', () => {
  test('should not return a checkout if ID is not provided', async () => {
    const { result, waitForNextUpdate } = renderHookWithClient(() =>
      useShopifyCheckout()
    )

    expect(result.current.loading).toBe(false)
    expect(result.current.checkout).toBeUndefined()
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

    const { result, waitForNextUpdate } = renderHookWithClient(
      () => useShopifyCheckout('id'),
      client
    )

    expect(result.current.loading).toBe(true)

    await waitForNextUpdate()

    expect(result.current.loading).toBe(false)
    expect(result.current.checkout.__typename).toBe('Checkout')
  })

  describe('actions', () => {
    test('createCheckout should return a new checkout', async () => {
      const { result } = renderHookWithClient(
        () => useShopifyCheckout(),
        clientWithNodeMock('Checkout')
      )

      const { data } = await result.current.actions.createCheckout()

      expect(data.__typename).toBe('Checkout')
    })

    test('attributesUpdate should return the updated checkout', async () => {
      const { result } = renderHookWithClient(
        () => useShopifyCheckout('id'),
        clientWithNodeMock('Checkout')
      )

      const { data } = await result.current.actions.attributesUpdate({
        note: 'note',
      })

      expect(data.__typename).toBe('Checkout')
    })

    test('customerAssociate should return the updated checkout', async () => {
      const { result } = renderHookWithClient(
        () => useShopifyCheckout('id'),
        clientWithNodeMock('Checkout')
      )

      const { data } = await result.current.actions.customerAssociate('token')

      expect(data.__typename).toBe('Checkout')
    })

    test('customerDisassociate should return the updated checkout', async () => {
      const { result } = renderHookWithClient(
        () => useShopifyCheckout('id'),
        clientWithNodeMock('Checkout')
      )

      const { data } = await result.current.actions.customerDisassociate(
        'token'
      )

      expect(data.__typename).toBe('Checkout')
    })

    test('discountCodeApply should return the updated checkout', async () => {
      const { result } = renderHookWithClient(
        () => useShopifyCheckout('id'),
        clientWithNodeMock('Checkout')
      )

      const { data } = await result.current.actions.discountCodeApply('code')

      expect(data.__typename).toBe('Checkout')
    })

    test('discountCodeRemove should return the updated checkout', async () => {
      const { result } = renderHookWithClient(
        () => useShopifyCheckout('id'),
        clientWithNodeMock('Checkout')
      )

      const { data } = await result.current.actions.discountCodeRemove()

      expect(data.__typename).toBe('Checkout')
    })

    test('emailUpdate should return the updated checkout', async () => {
      const { result } = renderHookWithClient(
        () => useShopifyCheckout('id'),
        clientWithNodeMock('Checkout')
      )

      const { data } = await result.current.actions.emailUpdate('email')

      expect(data.__typename).toBe('Checkout')
    })

    test('giftCardsAppend should return the updated checkout', async () => {
      const { result } = renderHookWithClient(
        () => useShopifyCheckout('id'),
        clientWithNodeMock('Checkout')
      )

      const { data } = await result.current.actions.giftCardsAppend([
        'code1',
        'code2',
      ])

      expect(data.__typename).toBe('Checkout')
    })

    test('giftCardRemove should return the updated checkout', async () => {
      const { result } = renderHookWithClient(
        () => useShopifyCheckout('id'),
        clientWithNodeMock('Checkout')
      )

      const { data } = await result.current.actions.giftCardRemove('code')

      expect(data.__typename).toBe('Checkout')
    })

    test('lineItemsReplace should return the updated checkout', async () => {
      const { result } = renderHookWithClient(
        () => useShopifyCheckout('id'),
        clientWithNodeMock('Checkout')
      )

      const { data } = await result.current.actions.lineItemsReplace([
        { quantity: 1, variantId: 'id' },
      ])

      expect(data.__typename).toBe('Checkout')
    })

    test('shippingAddressUpdate should return the updated checkout', async () => {
      const { result } = renderHookWithClient(
        () => useShopifyCheckout('id'),
        clientWithNodeMock('Checkout')
      )

      const { data } = await result.current.actions.shippingAddressUpdate({})

      expect(data.__typename).toBe('Checkout')
    })

    test('shippingLineUpdate should return the updated checkout', async () => {
      const { result } = renderHookWithClient(
        () => useShopifyCheckout('id'),
        clientWithNodeMock('Checkout')
      )

      const { data } = await result.current.actions.shippingLineUpdate('handle')

      expect(data.__typename).toBe('Checkout')
    })
  })
})

describe.skip('useShopifyCustomer', () => {
  test('should not return a customer if token is not provided', async () => {
    const client = createClient()

    const Component = () => {
      const { customer, loading } = useShopifyCustomer()
      return loading ? 'loading' : customer ? 'has customer' : 'no customer'
    }

    const { container } = render(
      <ShopifyProvider client={client}>
        <Component />
      </ShopifyProvider>
    )
    expect(container.textContent).toBe('no customer')
  })

  test('should return customer if ID is provided', async () => {
    const client = createClient({
      mocks: {
        Node: (_, { id }) => ({
          id,
          __typename: 'Customer',
        }),
      },
    })

    const Component = () => {
      const { customer, loading } = useShopifyCustomer('id')
      return loading ? 'loading' : customer.__typename
    }

    const { container } = render(
      <ShopifyProvider client={client}>
        <Component />
      </ShopifyProvider>
    )
    expect(container.textContent).toBe('loading')
    await flushEffectsAndWait()
    expect(container.textContent).toBe('Customer')
  })

  describe.skip('actions', () => {
    test('createCustomer should return a new customer', async () => {
      const client = createClient()

      const Component = () => {
        const [customerId, setCustomerId] = useState(null)
        const {
          customer,
          loading,
          actions: { createCustomer },
        } = useShopifyCustomer(customerId)

        useEffect(() => {
          createCustomer('email', 'password').then(({ data }) =>
            setCustomerId(data.id)
          )
        }, [])

        if (!customer) return 'no customer'

        return loading ? 'loading' : customer.__typename
      }

      const { container } = render(
        <ShopifyProvider client={client}>
          <Component />
        </ShopifyProvider>
      )
      expect(container.textContent).toBe('no customer')
      await flushEffectsAndWait()
      expect(container.textContent).toBe('Customer')
    })

    test(
      'activateCustomer should return a new access token',
      testCustomerActionToken({
        action: 'activateCustomer',
        hookArgs: [],
        actionArgs: ['id', 'activate token', 'password'],
      })
    )

    test('recoverCustomer should return undefined', async () => {
      const client = createClient()

      const Component = () => {
        const [response, setResponse] = useState(null)
        const {
          actions: { recoverCustomer },
        } = useShopifyCustomer()

        useEffect(() => {
          recoverCustomer('email').then(({ data }) => setResponse(data))
        }, [])

        return typeof response
      }

      const { container } = render(
        <ShopifyProvider client={client}>
          <Component />
        </ShopifyProvider>
      )
      await flushEffectsAndWait()
      expect(container.textContent).toBe('undefined')
    })

    test(
      'resetCustomer should return a new access token',
      testCustomerActionToken({
        action: 'resetCustomer',
        hookArgs: [],
        actionArgs: ['id', 'reset token', 'password'],
      })
    )

    test(
      'resetCustomerByUrl should return a new access token',
      testCustomerActionToken({
        action: 'resetCustomerByUrl',
        hookArgs: [],
        actionArgs: ['reset url', 'password'],
      })
    )

    test('addressCreate should return the new address', async () => {
      const client = createClient()

      const Component = () => {
        const [address, setAddress] = useState(null)
        const {
          loading,
          actions: { addressCreate },
        } = useShopifyCustomer('id')

        useEffect(() => {
          addressCreate({}).then(({ data }) => setAddress(data))
        }, [])

        return address ? address.__typename : 'no address'
      }

      const { container } = render(
        <ShopifyProvider client={client}>
          <Component />
        </ShopifyProvider>
      )
      expect(container.textContent).toBe('no address')
      await flushEffectsAndWait()
      expect(container.textContent).toBe('MailingAddress')
    })

    test('addressDelete should return undefined', async () => {
      const client = createClient()

      const Component = () => {
        const [response, setResponse] = useState(null)
        const {
          actions: { addressDelete },
        } = useShopifyCustomer('token')

        useEffect(() => {
          addressDelete('id').then(({ data }) => setResponse(data))
        }, [])

        return typeof response
      }

      const { container } = render(
        <ShopifyProvider client={client}>
          <Component />
        </ShopifyProvider>
      )
      await flushEffectsAndWait()
      expect(container.textContent).toBe('undefined')
    })

    test('addressUpdate should return the updated address', async () => {
      const client = createClient()

      const Component = () => {
        const [address, setAddress] = useState(null)
        const {
          loading,
          actions: { addressUpdate },
        } = useShopifyCustomer('token')

        useEffect(() => {
          addressUpdate('id', {}).then(({ data }) => setAddress(data))
        }, [])

        return address ? address.__typename : 'no address'
      }

      const { container } = render(
        <ShopifyProvider client={client}>
          <Component />
        </ShopifyProvider>
      )
      expect(container.textContent).toBe('no address')
      await flushEffectsAndWait()
      expect(container.textContent).toBe('MailingAddress')
    })

    test('addressDefaultAddressUpdate should return the updated customer', async () => {
      const client = createClient()

      const Component = () => {
        const [customer, setCustomer] = useState(null)
        const {
          actions: { addressDefaultAddressUpdate },
        } = useShopifyCustomer('token')

        useEffect(() => {
          addressDefaultAddressUpdate('id').then(({ data }) =>
            setCustomer(data)
          )
        }, [])

        return customer ? customer.__typename : 'no customer'
      }

      const { container } = render(
        <ShopifyProvider client={client}>
          <Component />
        </ShopifyProvider>
      )
      expect(container.textContent).toBe('no customer')
      await flushEffectsAndWait()
      expect(container.textContent).toBe('Customer')
    })

    test('updateCustomer should return the updated customer', async () => {
      const client = createClient()

      const Component = () => {
        const [customer, setCustomer] = useState(null)
        const {
          actions: { updateCustomer },
        } = useShopifyCustomer('token')

        useEffect(() => {
          updateCustomer({}).then(({ data }) => setCustomer(data))
        }, [])

        return customer ? customer.__typename : 'no customer'
      }

      const { container } = render(
        <ShopifyProvider client={client}>
          <Component />
        </ShopifyProvider>
      )
      expect(container.textContent).toBe('no customer')
      await flushEffectsAndWait()
      expect(container.textContent).toBe('Customer')
    })
  })
})
