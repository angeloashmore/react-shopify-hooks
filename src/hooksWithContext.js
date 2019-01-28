import React, { useEffect, useReducer, useContext } from 'react'
import { compose, get, merge } from 'lodash/fp'

import { getNodes } from './lib'
import {
  ShopifyProvider,
  useShopifyCheckout,
  useShopifyCustomer,
  useShopifyCustomerAccessToken,
  useShopifyProductVariant,
} from './hooks'

const initialState = {
  customerAccessToken: null,
  customerAccessTokenExpiresAt: null,
  checkoutId: null,
  checkoutLineItems: [],
}

const reducer = (state, action) => {
  const reduced = { ...state }
  const { type, payload } = action

  switch (type) {
    case 'SET_CUSTOMER_ACCESS_TOKEN':
      return {
        ...reduced,
        customerAccessToken: payload.accessToken,
        customerAccessTokenExpiresAt: payload.expiresAt,
      }

    case 'SET_CHECKOUT_ID':
      return {
        ...reduced,
        checkoutId: payload,
      }

    case 'SET_CHECKOUT_LINE_ITEMS':
      return {
        ...reduced,
        checkoutLineItems: payload,
      }

    case 'RESET':
      return initialState

    default:
      return reduced
  }
}

const ReducerContext = React.createContext()

const ReducerProvider = ({ children, persist = true }) => {
  const hookedReducer = useReducer(reducer, initialState)

  return (
    <ReducerContext.Provider value={hookedReducer}>
      {children}
    </ReducerContext.Provider>
  )
}

/***
 * ShopifyProviderWithContext
 *
 * Root context provider to allow Apollo to communicate with Shopify and store
 * global state.
 */
export const ShopifyProviderWithContext = ({ persist = true, ...props }) => (
  <ReducerProvider persist={persist}>
    <ShopifyProvider {...props} />
  </ReducerProvider>
)

/***
 * useShopifyReducer
 *
 * Returns the reducer used for managing global state.
 */
export const useShopifyReducer = () => useContext(ReducerContext)

/***
 * useShopifyCustomerAccessTokenWithContext
 *
 * useShopifyCustomerAccessToken hooked up to global state. Customer access
 * tokens are stored in the global state to allow implicit access to the token
 * in other hooks.
 *
 * If autoRenew is true, this hook will automatically renew the token if the
 * saved token expires within 1 day.
 */
export const useShopifyCustomerAccessTokenWithContext = (autoRenew = true) => {
  const [{ customerAccessToken }, dispatch] = useShopifyReducer()
  const useShopifyCustomerAccessTokenResult = useShopifyCustomerAccessToken(
    customerAccessToken
  )
  const {
    createCustomerAccessToken,
    renewCustomerAccessToken,
    deleteCustomerAccessToken,
  } = useShopifyCustomerAccessTokenResult

  // Renews and sets the global customer access token.
  const renewToken = async () => {
    const result = await renewCustomerAccessToken(customerAccessToken)

    if (result.data) {
      const {
        data: { accessToken, expiresAt },
      } = result

      dispatch({
        type: 'SET_CUSTOMER_ACCESS_TOKEN',
        payload: { accessToken, expiresAt },
      })
    }

    return result
  }

  // TODO: Add auto-renew logic here.
  // - If wihin 1 day (duration undecided) of expiration, renew token

  return merge(useShopifyCustomerAccessTokenResult, {
    customerAccessToken,
    isSignedIn: Boolean(customerAccessToken),
    actions: {
      // Creates and sets the global customer access token.
      signIn: async (...args) => {
        const result = await createCustomerAccessToken(...args)

        if (result.data) {
          const {
            data: { accessToken, expiresAt },
          } = result

          dispatch({
            type: 'SET_CUSTOMER_ACCESS_TOKEN',
            payload: { accessToken, expiresAt },
          })
        }

        return result
      },

      // Renews and sets the global customer access token.
      renewToken,

      // Deletes the global customer access token and resets the global state.
      signOut: async () => {
        if (customerAccessToken) deleteCustomerAccessToken(customerAccessToken)
        dispatch({ type: 'RESET' })
      },
    },
  })
}

/***
 * useShopifyCheckoutWithContext
 *
 * useShopifyCheckout hooked up to global state. A single checkout is stored
 * globally to allow implicit access to the checkout in other hooks.
 */
export const useShopifyCheckoutWithContext = (autoCreate = true) => {
  const [{ checkoutId }, dispatch] = useShopifyReducer()
  const useShopifyCheckoutResult = useShopifyCheckout(checkoutId)
  const {
    actions: { createCheckout },
  } = useShopifyCheckoutResult

  // Creates and sets a new global checkout.
  const createCheckoutWithContext = async (...args) => {
    const result = await createCheckout(...args)

    if (result.data) {
      const {
        data: { id },
      } = result

      dispatch({ type: 'SET_CHECKOUT_ID', payload: id })
    }

    return result
  }

  // If autoCreate is true, automatically create a new checkout if one is not
  // present.
  useEffect(
    () => {
      if (autoCreate && !checkoutId) createCheckoutWithContext()
    },
    [checkoutId]
  )

  return merge(useShopifyCheckoutResult, {
    actions: {
      // Creates and sets a new global checkout.
      createCheckout: createCheckoutWithContext,
    },
  })
}

/***
 * useShopifyProductVariantWithContext
 *
 * useShopifyCheckout hooked up to global state. This provides convenient
 * global checkout-related functions.
 */
export const useShopifyProductVariantWithContext = variantId => {
  const [{ checkoutLineItems }, dispatch] = useShopifyReducer()
  const useShopifyProductVariantResult = useShopifyProductVariant(variantId)
  const {
    actions: { lineItemsReplace },
  } = useShopifyCheckout()

  return merge(useShopifyProductVariantResult, {
    actions: {
      // Adds the product variant to the global checkout.
      addToCheckout: async (quantity = 1, customAttributes) => {
        // TODO: Need a proper merge w/ quantity checking
        const newLineItem = { variantId, quantity, customAttributes }
        const mergedLineItems = [...checkoutLineItems, newLineItem]
        const checkout = await lineItemsReplace(mergedLineItems)

        const lineItems = compose(
          getNodes,
          get('lineItems')
        )(checkout)

        dispatch({ type: 'SET_CHECKOUT_LINE_ITEMS', payload: lineItems })
      },
    },
  })
}

/***
 * useShopifyCustomerWithContext
 *
 * useShopifyCustomer hooked up to global state.
 */
export const useShopifyCustomerWithContext = () => {
  const [{ customerAccessToken }, dispatch] = useShopifyReducer()
  const useShopifyCustomerResult = useShopifyCustomer(customerAccessToken)
  const {
    actions: { activateCustomer, resetCustomer, resetCustomerByUrl },
  } = useShopifyCustomerResult

  return merge(useShopifyCustomerResult, {
    actions: {
      // Activates the customer and sets the global customer access token.
      activateCustomer: async (...args) => {
        const result = await activateCustomer(...args)

        if (result.data) {
          const {
            data: { accessToken, expiresAt },
          } = result

          dispatch({
            type: 'SET_CUSTOMER_ACCESS_TOKEN',
            payload: { accessToken, expiresAt },
          })
        }

        return result
      },

      // Resets the customer and sets the global customer access token.
      resetCustomer: async (...args) => {
        const result = await resetCustomer(...args)

        if (result.data) {
          const {
            data: { accessToken, expiresAt },
          } = result

          dispatch({
            type: 'SET_CUSTOMER_ACCESS_TOKEN',
            payload: { accessToken, expiresAt },
          })
        }

        return result
      },

      // Resets the customer and sets the global customer access token.
      resetCustomerByUrl: async (...args) => {
        const result = await resetCustomerByUrl(...args)

        if (result.data) {
          const {
            data: { accessToken, expiresAt },
          } = result

          dispatch({
            type: 'SET_CUSTOMER_ACCESS_TOKEN',
            payload: { accessToken, expiresAt },
          })
        }

        return result
      },
    },
  })
}
