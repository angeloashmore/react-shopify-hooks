# useShopifyCheckout

```
(checkoutId: String) => ({ checkout?: Checkout, loading: Boolean, error?: Error actions: Actions })
```

Creates, renews, and deletes customer access tokens.

## Arguments

- `checkoutId` - The ID of the Checkout to return.

## Return Fields

- `product` - The Product object.
- `loading` - Boolean stating if data fetching is in progress.
- `error` - GraphQL or network error message.
- `actions` - Object of actions. See **Actions** below for details.

## Actions

### createCheckout

### attributesUpdate

### customerAssociate

### customerDisassociate

### discountCodeApply

### discountCodeRemove

### emailUpdate

### giftCardsAppend

### giftCardRemove

### lineItemsReplace

### shippingAddressUpdate

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
