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
