import React from 'react'
import { render, cleanup } from 'react-testing-library'

import { ShopifyProvider } from './context'
import { useShopifyApolloClient } from './hooks'

const shopName = 'graphql'
const storefrontAccessToken = '078bc5caa0ddebfa89cccb4a1baa1f5c'

afterEach(cleanup)

describe.skip('ShopifyProvider', () => {
  test('creates Shopify Storefront client', () => {
    const Consumer = () => {
      const client = useShopifyApolloClient()
      return <div>{client}</div>
    }

    const tree = (
      <ShopifyProvider
        shopName={shopName}
        storefrontAccessToken={storefrontAccessToken}
      >
        <Consumer />
      </ShopifyProvider>
    )
    const { getByText, rerender } = render(tree)

    expect(getByText('test')).toHaveTextContent('test')
  })
})
