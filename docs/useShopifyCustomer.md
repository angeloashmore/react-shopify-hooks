# useShopifyCustomer

```
(customerAccessToken: String) => ({ customer?: Customer, loading: Boolean, error?: Error actions: Actions })
```

Fetches a customer using the provided customer access token and provides
actions for that customer.

## Arguments

- `customerId` - The ID of the Customer to return.

## Return Fields

- `customer` - The Customer object.
- `loading` - Boolean stating if data fetching is in progress.
- `error` - GraphQL or network error message.
- `actions` - Object of actions. See **Actions** below for details.

## Actions

### createCustomer

### activateCustomer

### recoverCustomer

### resetCustomer

### resetCustomerByUrl

### addressCreate

### addressDelete

### addressUpdate

### addressDefaultAddressUpdate

### updateCustomer

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
