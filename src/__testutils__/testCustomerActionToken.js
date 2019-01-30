import React, { useState, useEffect } from 'react'
import { render } from 'react-testing-library'

import { ShopifyProvider, useShopifyCustomer } from '../index'

import { createClient } from './createClient'
import { flushEffectsAndWait } from './flushEffectsAndWait'

const client = createClient()

export const testCustomerActionToken = ({
  action,
  hookArgs = [],
  actionArgs = [],
}) => async () => {
  const Component = () => {
    const [data, setData] = useState(null)
    const { customer, loading, actions } = useShopifyCustomer(...hookArgs)

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
        {data && <div data-testid="data-accessToken">{data.accessToken}</div>}
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
  expect(getByTestId('data-accessToken').textContent).toBe('Hello World')
}
