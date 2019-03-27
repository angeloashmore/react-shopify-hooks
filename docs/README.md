# react-shopify-hooks

Collection of React hooks for interacting with the Shopify Storefront API.

## Install

```sh
npm install --save react-shopify-hooks
```

## API

This package contains two sets of hooks: one set of hooks that keeps a global
context of the current checkout and customer and another set of hooks that
provides low-level access to the Shopify API.

**Recommended**: High-level context-aware hooks allowing easy checkout and
customer management.

- [ShopifyProviderWithContext](./ShopifyProviderWithContext)
- [useShopifyCheckoutWithContext](./useShopifyCheckoutWithContext)
- [useShopifyCustomerAccessTokenWithContext](./useShopifyCustomerAccessTokenWithContext)
- [useShopifyCustomerWithContext](./useShopifyCustomerWithContext)
- [useShopifyProductVariantWithContext](./useShopifyProductVariantWithContext)
- [useShopifyReducer](./useShopifyReducer)

Low-level hooks with direct access to the Shopify Storefront GraphQL API. The
context-aware hooks are build using these hooks.

- [ShopifyProvider](./ShopifyProvider.md)
- [useShopifyCheckout](./useShopifyCheckout.md)
- [useShopifyCustomerAccessToken](./useShopifyCustomerAccessToken.md)
- [useShopifyCustomer](./useShopifyCustomer.md)
- [useShopifyProductVariant](./useShopifyProductVariant.md)
- [useShopifyProduct](./useShopifyProduct.md)
