import React from 'react'
import { renderHook, cleanup, act } from 'react-hooks-testing-library'

import { createClient } from '../__testutils__/createClient'

import {
  ShopifyProvider,
  useShopifyCheckout,
  useShopifyCustomer,
  useShopifyCustomerAccessToken,
  useShopifyProduct,
  useShopifyProductVariant,
} from '../index'

// TODO: Remove console.error mock once the React `act` warning is resolved.
// See https://github.com/mpeyper/react-hooks-testing-library/issues/14
beforeEach(() => (console.error = jest.fn()))
afterEach(() => console.error.mockClear())

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
    const { result } = renderHookWithClient(() => useShopifyCheckout())

    expect(result.current.loading).toBe(false)
    expect(result.current.checkout).toBeUndefined()
  })

  test('should return checkout if ID is provided', async () => {
    const { result, waitForNextUpdate } = renderHookWithClient(
      () => useShopifyCheckout('id'),
      clientWithNodeMock('Checkout')
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

describe('useShopifyCustomer', () => {
  test('should not return a customer if token is not provided', async () => {
    const { result } = renderHookWithClient(() => useShopifyCustomer())

    expect(result.current.loading).toBe(false)
    expect(result.current.customer).toBeUndefined()
  })

  test('should return customer if ID is provided', async () => {
    const { result, waitForNextUpdate } = renderHookWithClient(() =>
      useShopifyCustomer('id')
    )

    expect(result.current.loading).toBe(true)
    await waitForNextUpdate()
    expect(result.current.loading).toBe(false)

    expect(result.current.customer.__typename).toBe('Customer')
  })

  describe('actions', () => {
    test('createCustomer should return a new customer', async () => {
      const { result } = renderHookWithClient(() => useShopifyCustomer())
      const { data } = await result.current.actions.createCustomer(
        'email',
        'password'
      )

      expect(data.__typename).toBe('Customer')
    })

    test('activateCustomer should return a new access token', async () => {
      const { result } = renderHookWithClient(() => useShopifyCustomer())
      const { data } = await result.current.actions.activateCustomer(
        'id',
        'activate token',
        'password'
      )

      expect(data.__typename).toBe('CustomerAccessToken')
    })

    test('recoverCustomer should return undefined', async () => {
      const { result } = renderHookWithClient(() => useShopifyCustomer())
      const { data } = await result.current.actions.recoverCustomer('email')

      expect(data).toBeUndefined()
    })

    test('resetCustomer should return a new access token', async () => {
      const { result } = renderHookWithClient(() => useShopifyCustomer())
      const { data } = await result.current.actions.resetCustomer(
        'id',
        'reset token',
        'password'
      )

      expect(data.__typename).toBe('CustomerAccessToken')
    })

    test('resetCustomerByUrl should return a new access token', async () => {
      const { result } = renderHookWithClient(() => useShopifyCustomer())
      const { data } = await result.current.actions.resetCustomerByUrl(
        'reset url',
        'password'
      )

      expect(data.__typename).toBe('CustomerAccessToken')
    })

    test('addressCreate should return the new address', async () => {
      const { result } = renderHookWithClient(() => useShopifyCustomer('id'))
      const { data } = await result.current.actions.addressCreate({})

      expect(data.__typename).toBe('MailingAddress')
    })

    test('addressDelete should return undefined', async () => {
      const { result } = renderHookWithClient(() => useShopifyCustomer('id'))
      const { data } = await result.current.actions.addressDelete('id')

      expect(data).toBeUndefined()
    })

    test('addressUpdate should return the updated address', async () => {
      const { result } = renderHookWithClient(() => useShopifyCustomer('id'))
      const { data } = await result.current.actions.addressUpdate('id', {})

      expect(data.__typename).toBe('MailingAddress')
    })

    test('addressDefaultAddressUpdate should return the updated customer', async () => {
      const { result } = renderHookWithClient(() => useShopifyCustomer('id'))
      const { data } = await result.current.actions.addressDefaultAddressUpdate(
        'id'
      )

      expect(data.__typename).toBe('Customer')
    })

    test('updateCustomer should return the updated customer', async () => {
      const { result } = renderHookWithClient(() => useShopifyCustomer('id'))
      const { data } = await result.current.actions.updateCustomer({})

      expect(data.__typename).toBe('Customer')
    })
  })
})
