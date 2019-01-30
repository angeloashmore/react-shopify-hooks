import React, { useState, useEffect } from 'react'
import { render, cleanup, flushEffects, fireEvent } from 'react-testing-library'

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

    test(
      'attributesUpdate should return the updated checkout',
      testCheckoutAction({
        action: 'attributesUpdate',
        hookArgs: ['id'],
        actionArgs: [{ note: 'note' }],
      })
    )

    test(
      'customerAssociate should return the updated checkout',
      testCheckoutAction({
        action: 'customerAssociate',
        hookArgs: ['id'],
        actionArgs: ['token'],
      })
    )

    test(
      'customerDisassociate should return the updated checkout',
      testCheckoutAction({
        action: 'customerDisassociate',
        hookArgs: ['id'],
        actionArgs: ['token'],
      })
    )

    test(
      'discountCodeApply should return the updated checkout',
      testCheckoutAction({
        action: 'discountCodeApply',
        hookArgs: ['id'],
        actionArgs: ['code'],
      })
    )

    test(
      'discountCodeRemove should return the updated checkout',
      testCheckoutAction({
        action: 'discountCodeRemove',
        hookArgs: ['id'],
      })
    )

    test(
      'emailUpdate should return the updated checkout',
      testCheckoutAction({
        action: 'emailUpdate',
        hookArgs: ['id'],
        actionArgs: ['email'],
      })
    )

    test(
      'giftCardsAppend should return the updated checkout',
      testCheckoutAction({
        action: 'giftCardsAppend',
        hookArgs: ['id'],
        actionArgs: [['code1', 'code2']],
      })
    )

    test(
      'giftCardRemove should return the updated checkout',
      testCheckoutAction({
        action: 'giftCardRemove',
        hookArgs: ['id'],
        actionArgs: ['code'],
      })
    )

    test(
      'lineItemsReplace should return the updated checkout',
      testCheckoutAction({
        action: 'lineItemsReplace',
        hookArgs: ['id'],
        actionArgs: [[{ quantity: 1, variantId: 'id' }]],
      })
    )

    test(
      'shippingAddressUpdate should return the updated checkout',
      testCheckoutAction({
        action: 'shippingAddressUpdate',
        hookArgs: ['id'],
        actionArgs: [{}],
      })
    )

    test(
      'shippingLineUpdate should return the updated checkout',
      testCheckoutAction({
        action: 'shippingLineUpdate',
        hookArgs: ['id'],
        actionArgs: ['handle'],
      })
    )
  })
})

describe('useShopifyCustomer', () => {
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

  describe('actions', () => {
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
