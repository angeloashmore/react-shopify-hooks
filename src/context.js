import React from 'react'
import Shopify from 'shopify-buy'

export const ShopifyContext = React.createContext()

export const ShopifyProvider = ({
  children,
  domain,
  storefrontAccessToken,
}) => {
  const client = Shopify.buildClient({ domain, storefrontAccessToken })

  return (
    <ShopifyContext.Provider value={client}>{children}</ShopifyContext.Provider>
  )
}
