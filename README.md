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

---

### `useShopifyProduct`

```
const { product, error } = useShopifyProduct(productId)
```

- `product` &mdash; All product data for the provided product ID
- `error` &mdash; Error message if fetching product data failed

---

### `useShopifyProductVariant`

```
const { product, actions, error } = useShopifyProduct(productId, productVariantId)
```

- `product` &mdash; All product variant data for the provided product variant
  ID
- `actions` &mdash; Collection of functions related to the product variant
  - `addToCheckout(checkoutId?)` &mdash; Add the product variant to a checkout.
    Defaults to the global checkout.
- `error` &mdash; Error message if fetching product variant data failed

---

### `useShopifyAuth`

```
const { signIn, signOut, isSignedIn } = useShopifyAuth()
```

- `signIn(email, password)` &mdash; Retrieve and store a customer access token
- `signOut()` &mdash; Sign out and reset all global state
- `isSignedIn` &mdash; `true` if signed in, `false` otherwise

---

### `useShopifyCheckout`

```
const { checkout, actions, error } = useShopifyCheckout(checkoutId?, setGlobal = true)
```

Fetches a checkout using the provided checkout ID and provides actions for that
checkout. If no checkout ID is provided, a new checkout is created.

The global checkout will be set to the checkout here unless `setGlobal` is set
to false.

- `checkout` &mdash; All checkout data. Data updates on successful actions.
- `actions` &mdash; Collection of functions related to the product variant
  - `attributesUpdate(lineItems)` &mdash; Update the checkout attributes
  - `customerAssociate(customerAccessToken?)` &mdash; Associate the checkout to a customer. If no customer access token is provided, the global access token is used.
  - `customerDisassociate()` &mdash; Disssociate the checkout from any customer
  - `discountCodeApply(code)` &mdash; Apply a discount code to the checkout
  - `discountCodeRemove()` &mdash; Remove any discount code from the checkout
  - `emailUpdate()` &mdash; Update the checkout's email address
  - `giftCardsAppend(codes)` &mdash; Append gift card codes to the checkout
  - `giftCardsRemove(code)` &mdash; Remove the gift card code from the checkout
  - `lineItemsReplace(lineItems)` &mdash; Replace the checkout line items
  - `shippingAddressUpdate(address)` &mdash; Update the checkout's shipping address
  - `shippingLineUpdate(handle)` &mdash; Update the checkout's shipping line
- `error` &mdash; Error message if fetching checkout data failed
