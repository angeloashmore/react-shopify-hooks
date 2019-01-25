# react-shopify-hooks

Collection of React hooks for interacting with the Shopify API.

## Status

Planning. Work on implemtation.

## Install

```sh
npm install --save react-shopify-hooks
```

## API

### `ShopifyProvider`

```js
<ShopifyProvider
  shopName="your-shop-name"
  storefrontAccessToken="your-access-token"
>
  {children}
</ShopifyProvider>
```

Context provider for all Shopify hooks. Must be used at the root of your app.

### `useShopifyProduct`

```
const { product, error } = useShopifyProduct(productId)
```

- `product` &mdash; All product data for the provided product ID
- `error` &mdash; Error message if fetching product data failed

### `useShopifyProductVariant`

```
const { product, actions, error } = useShopifyProduct(productId, productVariantId)
```

- `product` &mdash; All product variant data for the provided product variant
  ID
- `actions` &mdash; Collection of functions related to the product variant
  - `addToCheckout` &mdash; Add the product variant to the global checkout
- `error` &mdash; Error message if fetching product variant data failed

### `useShopifyAuth`

```
const { signIn, signOut, isSignedIn } = useShopifyAuth()
```

- `signIn(email, password)` &mdash; Retrieve and store a customer access token
- `signOut` &mdash; Sign out and reset all global state
- `isSignedIn` &mdash; `true` if signed in, `false` otherwise

### `useShopifyCheckout`

```
const { checkout, actions, error } = useShopifyCheckout()
```

- `checkout` &mdash; All checkout data
- `actions` &mdash; Collection of functions related to the product variant
  - `createCheckout` &mdash; Create and globally set a new checkout
- `error` &mdash; Error message if fetching checkout data failed
