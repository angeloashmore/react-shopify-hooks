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

- `product`<br/>
  All product data for the provided product ID

- `error`<br/>
  Error message if fetching product data failed

---

### `useShopifyProductVariant`

```
const { productVariant, actions, error } = useShopifyProductVariant(productId, productVariantId)
```

Fetches product variant data. Note that the parent product's ID is necessary.

#### Return Values

- `productVariant`<br/>
  All product variant data for the provided product variant ID

- `actions`<br/>
  Collection of functions related to the product variant

  - `addToCheckout(quantity = 1, checkoutId?)`<br/>
    Add the product variant to a checkout. Defaults to the global checkout.

- `error`<br/>
  Error message if fetching product variant data failed

---

### `useShopifyCustomerAccessToken`

```
const { create, renew, delete } = useShopifyCustomerAccessToken()
```

Manages customer access token creation, renewal, and deletion.

#### Return Values

**Object** with the following properties.

- `create(email, password)`<br/>
  Create a new customer access token. Returns the token.

- `renew(customerAccessToken)`<br/>
  Renew the customer access token. Returns the renewed token.

- `delete(customerAccessToken)`<br/>
  Permanently delete the customer access token.

---

### `useShopifyCheckout`

```
const { checkout, actions, error } = useShopifyCheckout(checkoutId?)
```

Fetches a checkout using the provided checkout ID and provides actions for that
checkout.

If no checkout ID is provided, all actions except `createCheckout` will fail.

#### Example

```js
const ApplyDiscountButton = ({ discountCode }) => {
  const {
    actions: { discountCodeApply },
  } = useShopifyCheckout(myCheckoutId)

  return (
    <button onClick={() => discountCodeApply(discountCode)}>
      Instant savings!
    </button>
  )
}
```

#### Return Values

**Object** with the following properties.

- `checkout`<br/>
  All checkout data. Data updates on successful actions.

- `actions`<br/>
  Collection of functions related to the product variant

  - `createCheckout()`<br/>
    Create a new checkout. Returns the checkout ID.

  - `attributesUpdate(attributes)`<br/>
    Update the checkout attributes.

  - `customerAssociate(customerAccessToken)`<br />
    Associate the checkout to a customer.

  - `customerDisassociate()`<br/>
    Disssociate the checkout from any customer.

  - `discountCodeApply(code)`<br/>
    Apply a discount code to the checkout.

  - `discountCodeRemove()`<br/>
    Remove any discount code from the checkout.

  - `emailUpdate(email)`<br/>
    Update the checkout's email address.

  - `giftCardsAppend(codes)`<br/>
    Append gift card codes to the checkout.

  - `giftCardRemove(code)`<br/>
    Remove the gift card code from the checkout.

  - `lineItemsReplace(lineItems)`<br/>
    Replace the checkout line items.

  - `shippingAddressUpdate(address)`<br/>
    Update the checkout's shipping address.

  - `shippingLineUpdate(handle)`<br/>
    Update the checkout's shipping line.

- `error`<br/>
  Error message if fetching checkout data failed.

---

### `useShopifyCustomer`

```
const { customer, actions, error } = useShopifyCustomer(customerAccessToken?)
```

Fetches a customer using the provided customer access token and provides
actions for that customer.

If no customer access token is provided, all actions except `createCustomer`,
`activateCustomer`, `recoverCustomer`, `resetCustomer`, and
`resetCustomerByUrl` will fail.

#### Return Values

- `customer`<br/>
  All customer data for the provided customer access token.

- `actions`<br/>
  Collection of functions related to the customer.

  - `createCustomer(email, password)`<br/>
    Create a new customer.

  - `activateCustomer(customerId, activationToken, password)`<br/>
    Activate a customer using the provided customer Id, activation token, and
    password.

  - `recoverCustomer(email)`<br/>
    Send a reset password email to the customer.

  - `resetCustomer(resetToken, password)`<br/>
    Reset a customer's password with the provided reset token and password.

  - `resetCustomerByUrl(resetUrl, password)`<br/>
    Reset a customer's password with the provided reset URL and password.

  - `addressCreate(address)`<br/>
    Add an address to the customer.

  - `addressDelete(addressId)`<br/>
    Delete a customer's address using the address ID.

  - `addressUpdate(id, address)`<br/>
    Update a customer's address using the address ID.

  - `addressDefaultAddressUpdate(addressId)`<br/>
    Set a default address for the customer.

  - `updateCustomer(attributes)`<br/>
    Update a customer's attributes.

- `error`<br/>
  Error message if fetching customer data failed
