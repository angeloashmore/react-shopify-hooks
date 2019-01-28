import React from 'react'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { MockLink } from 'apollo-link-mock'
import renderer from 'react-test-renderer'

import { ShopifyProvider, useShopifyProduct } from './index'

import { QueryProductNode } from './graphql/QueryProductNode'

const defaultMocks = [
  {
    request: {
      query: QueryProductNode,
      variables: {
        id: 'id',
      },
    },
    result: {
      data: {
        node: {
          __typename: 'Product',
          id: 'id',
          availableForSale: true,
          createdAt: 'createdAt',
          updatedAt: 'updatedAt',
          descriptionHtml: 'descriptionHtml',
          description: 'description',
          handle: 'handle',
          productType: 'productType',
          title: 'title',
          vendor: 'vendor',
          publishedAt: 'publishedAt',
          onlineStoreUrl: 'onlineStoreUrl',
          options: [],
          images: [],
          variants: [],
        },
      },
    },
  },
]

const waitForNextTick = ms => new Promise(resolve => setTimeout(resolve, ms))

const Wrapper = ({ mocks = defaultMocks, children }) => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new MockLink(mocks),
  })

  return <ShopifyProvider client={client}>{children}</ShopifyProvider>
}

describe('useShopifyProduct', () => {
  test('should fetch product data by ID', async () => {
    const Component = () => {
      const { product, loading } = useShopifyProduct('id')
      return loading ? 'loading' : product.title
    }

    const component = renderer.create(
      <Wrapper>
        <Component />
      </Wrapper>
    )

    const tree = component.toJSON()
    expect(tree).toBe('loading')

    await waitForNextTick(25)

    const tree2 = component.toJSON()
    expect(tree2).toBe('title')
  })
})
