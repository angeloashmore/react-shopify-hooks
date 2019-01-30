import React, { useState, useEffect } from 'react'
import { render } from 'react-testing-library'

import { ShopifyProvider, useShopifyCheckout } from '../index'

import { createClient } from './createClient'
import { flushEffectsAndWait } from './flushEffectsAndWait'

const client = createClient({
  mocks: {
    Node: (_, { id }) => ({
      id,
      __typename: 'Checkout',
    }),
  },
})

export const testCheckoutAction = ({
  action,
  hookArgs = [],
  actionArgs = [],
}) => async () => {
  const Component = () => {
    const [data, setData] = useState(null)
    const { checkout, loading, actions } = useShopifyCheckout(...hookArgs)

    const effect = async () => {
      const { data } = await actions[action](...actionArgs)
      setData(data)
    }

    useEffect(() => {
      effect()
    }, [])

    return (
      <div>
        <div data-testid="loading">{loading.toString()}</div>
        {data && <div data-testid="data-typename">{data.__typename}</div>}
      </div>
    )
  }

  const { getByTestId } = render(
    <ShopifyProvider client={client}>
      <Component />
    </ShopifyProvider>
  )

  // FLUSH-BABY-FLUSH
  // Need to wait long enough for Apollo client to return data.
  await flushEffectsAndWait()
  await flushEffectsAndWait()
  await flushEffectsAndWait()
  expect(getByTestId('loading').textContent).toBe('false')
  expect(getByTestId('data-typename').textContent).toBe('Checkout')
}
