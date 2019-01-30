# react-shopify-hooks

Collection of React hooks for interacting with the Shopify API.

## Install

```sh
npm install --save react-shopify-hooks
```

## API

### `useShopifyProduct`

```
(productId: String) => ({ product?: Product, loading: Boolean, error?: Error })
```

Fetches product data by product ID.

#### Example

```js
import { useShopifyProduct } from 'react-shopify-hooks'

const ProductCard = productId => {
  const { product, loading, error } = useShopifyProduct(productId)

  if (loading) return 'Loading'
  if (error) return 'Error!'

  return (
    <a href={`/products/${product.handle}`}>
      <div className="product-card">
        <h3>{product.title}</h3>
        <p>{product.description}</p>
      </div>
    </a>
  )
}
```

#### Arguments

`productId` - The ID of the Product to return.

#### Return Fields

`product` - The Product object.
`loading` - Boolean stating if data fetching is in progress.
`error` - GraphQL or network error message.
