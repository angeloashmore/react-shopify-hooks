import React, { Suspense } from 'react'
import { render, cleanup, flushEffects } from 'react-testing-library'
import { ApolloProvider } from 'react-apollo-hooks'
import { get } from 'lodash/fp'
import delay from 'delay'

import renderer from 'react-test-renderer'

import { createMockClient } from './__testutils__/createMockClient'
import { QueryProductNode } from './graphql/QueryProductNode'
import { useShopifyProduct, useShopifyProductVariant } from './hooks'

const mocks = [
  {
    request: {
      query: QueryProductNode,
      variables: {
        id: 'productId',
      },
    },
    result: {
      data: {
        node: {
          __typename: 'Product',
          id: 'productId',
          availableForSale: true,
          createdAt: 'productCreatedAt',
          updatedAt: 'productUpdatedAt',
          descriptionHtml: 'productDescriptionHtml',
          description: 'productDescription',
          handle: 'productHandle',
          productType: 'productType',
          title: 'productTitle',
          vendor: 'productVendor',
          publishedAt: 'productPublishedAt',
          onlineStoreUrl: 'productOnlineStoreUrl',
          options: [
            {
              __typename: 'ProductOption',
              name: 'productName',
              values: 'productValues',
            },
          ],
          images: [],
          variants: {
            pageInfo: {
              __typename: 'PageInfo',
              hasNextPage: true,
              hasPreviousPage: true,
            },
            edges: [
              {
                __typename: 'ProductEdge',
                cursor: 'productVariantCursor',
                node: {
                  __typename: 'ProductVariant',
                  id: 'productVariantId',
                  title: 'productVariantTitle',
                  price: 'productVariantPrice',
                  weight: 'productVariantWeight',
                  available: true,
                  sku: 'productVariantSku',
                  compareAtPrice: 'productVariantCompareAtPrice',
                  image: {
                    __typename: 'Image',
                    id: 'productVariantImageId',
                    src: 'productVariantImageSrc',
                    altText: 'productVariantImageAltText',
                  },
                  selectedOptions: [
                    {
                      __typename: 'SelectedOption',
                      name: 'name',
                      value: 'value',
                    },
                  ],
                },
              },
            ],
          },
        },
      },
    },
  },
]

const SuspenseCompat = ({ children }) => <>{children}</>

const Wrapper = ({ mocks, suspend = true, children, ...props }) => {
  const client = createMockClient({ mocks })
  const SuspenseComponent = suspend ? Suspense : SuspenseCompat

  return (
    <ApolloProvider client={client}>
      <SuspenseComponent fallback="loading">{children}</SuspenseComponent>
    </ApolloProvider>
  )
}

// afterEach(cleanup)

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

    await delay(1)

    const tree = component.toJSON()
    expect(tree).toBe('loading')

    // expect(component.toJSON()).toBe('productTitle')

    // const { container } = render(
    //   <Wrapper mocks={mocks}>
    //     <Component />
    //   </Wrapper>
    // )

    // expect(container.textContent).toBe('loading')

    // flushEffects()
    // // await delay(1)

    // expect(container.textContent).toBe('productTitle')
  })
})

describe.skip('useShopifyProductVariant', () => {
  test('should fetch product variant data by ID', async () => {
    const Component = () => {
      const { productVariant, error } = useShopifyProductVariant(
        'productId',
        'productVariantId'
      )
      return <>{productVariant.title}</>
    }

    const { container } = render(
      <Wrapper mocks={mocks}>
        <Component />
      </Wrapper>
    )

    expect(container.textContent).toBe('loading')

    // flushEffects()
    // await delay(1)

    expect(container.textContent).toBe('productVariantTitle')
  })
})
