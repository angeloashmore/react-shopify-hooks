import React from 'react'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { MockLink } from 'apollo-link-mock'
import renderer from 'react-test-renderer'

import { useShopifyProduct } from './hooks'

const Wrapper = ({ mocks = [], addTypename = true, children }) => {
  const client = new ApolloClient({
    cache: new InMemoryCache({ addTypename }),
    defaultOptions,
    link: new MockLink(mocks, addTypename),
  })

  return <ShopifyProvider client={client}>{children}</ShopifyProvider>
}

describe('useShopifyProduct', () => {
  test('should fetch product data by ID', async () => {
    const Component = () => {
      const { product, error } = useShopifyProduct('productId')
      return product.title
    }

    const component = renderer.create(
      <Wrapper mocks={mocks}>
        <Component />
      </Wrapper>
    )

    const tree = component.toJSON()
    expect(tree).toBe('test')
  })
})
