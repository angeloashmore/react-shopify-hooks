import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo-hooks'

export const ShopifyProvider = ({
  children,
  shopName,
  storefrontAccessToken,
}) => {
  const client = new ApolloClient({
    uri: `https://${shopName}.myshopify.com/api/graphql`,
    headers: {
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
    },
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
