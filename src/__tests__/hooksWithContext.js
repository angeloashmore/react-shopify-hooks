import React from 'react'
import { renderHook, cleanup, act } from 'react-hooks-testing-library'

import { createClient } from '../__testutils__/createClient'

import {
  ShopifyProviderWithContext,
  useShopifyCheckoutWithContext,
  useShopifyCustomerAccessTokenWithContext,
  useShopifyCustomerWithContext,
  useShopifyProductVariantWithContext,
  useShopifyReducer,
} from '../hooksWithContext'

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
    wrapper: props => <ShopifyProviderWithContext client={client} {...props} />,
  })

/***
 * useShopifyCustomerAccessTokenWithContext
 */
describe('useShopifyCustomerAccessTokenWithContext', () => {
  test('should be signed out by default', async () => {
    const { result } = renderHookWithClient(() =>
      useShopifyCustomerAccessTokenWithContext()
    )

    expect(result.current.isSignedIn).toBe(false)
    expect(result.current.customerAccessToken).toBeNull()
  })

  describe('actions', () => {
    test('signIn should sign in customer', async () => {
      const { result, waitForNextUpdate } = renderHookWithClient(() =>
        useShopifyCustomerAccessTokenWithContext()
      )

      expect(result.current.isSignedIn).toBe(false)

      act(() => result.current.actions.signIn('email', 'password'))

      await waitForNextUpdate()

      expect(result.current.isSignedIn).toBe(true)
      expect(result.current.customerAccessToken).toBe('Hello World')
    })

    test('renewToken should update the access token', async () => {
      const { result, waitForNextUpdate } = renderHookWithClient(() =>
        useShopifyCustomerAccessTokenWithContext()
      )

      act(() => result.current.actions.signIn('email', 'password'))

      await waitForNextUpdate()

      expect(result.current.isSignedIn).toBe(true)
      expect(result.current.customerAccessToken).toBe('Hello World')

      act(() => result.current.actions.renewToken())
      await waitForNextUpdate()

      expect(result.current.isSignedIn).toBe(true)
      expect(result.current.customerAccessToken).toBe('Hello World')
    })

    test('signOut should sign out customer', async () => {
      const { result, waitForNextUpdate } = renderHookWithClient(() =>
        useShopifyCustomerAccessTokenWithContext()
      )

      act(() => result.current.actions.signIn('email', 'password'))

      await waitForNextUpdate()

      expect(result.current.isSignedIn).toBe(true)
      expect(result.current.customerAccessToken).toBe('Hello World')

      act(() => result.current.actions.signOut())

      expect(result.current.isSignedIn).toBe(false)
      expect(result.current.customerAccessToken).toBe(null)
    })
  })
})

/***
 * useShopifyProductVariantWithContext
 */
describe('useShopifyProductVariantWithContext', () => {
  describe('actions', () => {
    // TODO: The following test only checks that the reducer's line items is
    // updated since the checkout is mocked. We could perform a better test by
    // spying on `checkout.replaceLineItems` to ensure it gets called with the
    // correct attributes.
    test('addToCheckout should add the product variant to the checkout', async () => {
      const { result, waitForNextUpdate } = renderHookWithClient(() => ({
        productVariant: useShopifyProductVariantWithContext('id'),
        reducer: useShopifyReducer(),
      }))

      expect(result.current.reducer[0].checkoutLineItems).toHaveLength(0)

      // Need to wait for several rerenders before checkout is ready.
      await waitForNextUpdate()
      await waitForNextUpdate()

      act(() => result.current.productVariant.actions.addToCheckout())

      // Need to wait for several rerenders as a result of multiple state changes.
      await waitForNextUpdate()
      await waitForNextUpdate()

      expect(result.current.reducer[0].checkoutLineItems).toHaveLength(2)
    })
  })
})

/***
 * useShopifyCustomerWithContext
 */
describe('useShopifyCustomerWithContext', () => {
  describe('actions', () => {
    test('activateCustomer should sign in the customer', async () => {
      const { result, waitForNextUpdate } = renderHookWithClient(() => ({
        customer: useShopifyCustomerWithContext(),
        customerAccessToken: useShopifyCustomerAccessTokenWithContext(),
      }))

      expect(result.current.customerAccessToken.isSignedIn).toBe(false)

      act(() =>
        result.current.customer.actions.activateCustomer(
          'id',
          'activation token',
          'password'
        )
      )

      await waitForNextUpdate()

      expect(result.current.customerAccessToken.isSignedIn).toBe(true)
    })

    test('resetCustomer should sign in the customer', async () => {
      const { result, waitForNextUpdate } = renderHookWithClient(() => ({
        customer: useShopifyCustomerWithContext(),
        customerAccessToken: useShopifyCustomerAccessTokenWithContext(),
      }))

      expect(result.current.customerAccessToken.isSignedIn).toBe(false)

      act(() =>
        result.current.customer.actions.resetCustomer(
          'id',
          'reset token',
          'password'
        )
      )

      await waitForNextUpdate()

      expect(result.current.customerAccessToken.isSignedIn).toBe(true)
    })

    test('resetCustomerByUrl should sign in the customer', async () => {
      const { result, waitForNextUpdate } = renderHookWithClient(() => ({
        customer: useShopifyCustomerWithContext(),
        customerAccessToken: useShopifyCustomerAccessTokenWithContext(),
      }))

      expect(result.current.customerAccessToken.isSignedIn).toBe(false)

      act(() =>
        result.current.customer.actions.resetCustomerByUrl(
          'reset url',
          'password'
        )
      )

      await waitForNextUpdate()

      expect(result.current.customerAccessToken.isSignedIn).toBe(true)
    })
  })
})
