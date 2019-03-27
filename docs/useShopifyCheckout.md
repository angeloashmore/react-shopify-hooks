# useShopifyCheckout

```
(checkoutId: String) => ({ checkout?: Checkout, loading: Boolean, error?: Error actions: Actions })
```

Fetches a checkout using the provided checkout ID and provides actions for that
checkout.

## Arguments

- `checkoutId` - The ID of the Checkout to return.

## Return Fields

- `checkout` - The Checkout object.
- `loading` - Boolean stating if data fetching is in progress.
- `error` - GraphQL or network error message.
- `actions` - Object of actions. See **Actions** below for details.

## Actions

### createCheckout

```
(input: CheckoutCreateInput) => ({ data: Checkout, errors: ?Error[] })
```

Creates a new checkout.

### attributesUpdate

```
(input: CheckoutAttributesUpdateV2Input) => ({ data: Checkout, errors: ?Error[] })
```

Updates the attributes of the checkout.

### customerAssociate

```
(customerAccessToken: String) => ({ data: Checkout, errors: ?Error[] })
```

Associates a customer to the checkout.

### customerDisassociate

```
() => ({ data: Checkout, errors: ?Error[] })
```

Disassociates the current checkout customer from the checkout.

### discountCodeApply

```
(discountCode: String) => ({ data: Checkout, errors: ?Error[] })
```

Applies a discount to the checkout using a discount code.

### discountCodeRemove

```
() => ({ data: Checkout, errors: ?Error[] })
```

Removes the applied discount from the checkout.

### emailUpdate

```
(email: String) => ({ data: Checkout, errors: ?Error[] })
```

Updates the email on the checkout.

### giftCardsAppend

```
(giftCardCodes: String[]) => ({ data: Checkout, errors: ?Error[] })
```

Appends gift cards to the checkout.

### giftCardRemove

```
(giftCardId: String) => ({ data: Checkout, errors: ?Error[] })
```

Removes an applied gift card from the checkout.

### lineItemsReplace

```
(lineItems: CheckoutLineItemInput) => ({ data: Checkout, errors: ?Error[] })
```

Sets a list of line items to the checkout.

### shippingAddressUpdate

```
(shippingAddress: MailingAddressInput) => ({ data: Checkout, errors: ?Error[] })
```

Updates the shipping address of the checkout.

### shippingLineUpdate

```
(shippingRateHandle: String) => ({ data: Checkout, errors: ?Error[] })
```

Updates the shipping lines on the checkout.

## Example

```jsx
import { useShopifyCheckout } from 'react-shopify-hooks'

// Create a new checkout and list its line items.
const CheckoutItems = () => {
  const [checkoutId, setCheckoutId] = useState(null)
  const {
    checkout,
    loading,
    error,
    actions: { createCheckout },
  } = useShopifyCheckout(checkoutId)

  useEffect(() => {
    if (!checkoutId) createCheckout().then(({ data }) => setCheckoutId(data.id))
  }, [checkoutId])

  if (loading) return 'Loading'
  if (error) return 'Error'

  return (
    <div>
      <h2>Checkout items</h2>
      <ul>
        {checkout.lineItems.edges.map(({ node: lineItem }) => (
          <li key={lineItem.id}>{lineItem.title}</li>
        ))}
      </ul>
    </div>
  )
}
```
