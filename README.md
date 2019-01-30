# react-shopify-hooks

Collection of React hooks for interacting with the Shopify API.

## Install

```sh
npm install --save react-shopify-hooks
```

## API

### useShopifyProduct

```
(productId: String) => ({ product?: Product, loading: Boolean, error?: Error })
```

Fetches product data by product ID.

#### Arguments

- `productId` - The ID of the Product to return.

#### Return Fields

- `product` - The Product object.
- `loading` - Boolean stating if data fetching is in progress.
- `error` - GraphQL or network error message.

#### Example

```js
import { useShopifyProduct } from 'react-shopify-hooks'

// Basic card to display product title and description linked to the product's
// detail page.
const ProductCard = ({ productId }) => {
  const { product, loading, error } = useShopifyProduct(productId)

  if (loading) return 'Loading'
  if (error) return 'Error'

  return (
    <a href={`/products/${product.handle}`}>
      <div className="product-card">
        <h3 className="product-card__title">{product.title}</h3>
        <p className="product-card__description">{product.description}</p>
      </div>
    </a>
  )
}
```

### useShopifyProductVariant

```
(productVariantId: String) => ({ productVariant?: ProductVariant, loading: Boolean, error?: Error })
```

Fetches product variant data by product variant ID.

#### Arguments

- `productVariantId` - The ID of the ProductVariant to return.

#### Return Fields

- `productVariant` - The ProductVariant object.
- `loading` - Boolean stating if data fetching is in progress.
- `error` - GraphQL or network error message.

#### Example

```js
import { useShopifyProductVariant } from 'react-shopify-hooks'

// Basic card to display product variant title and price.
const ProductVariantCard = ({ variantId }) => {
  const { productVariant, loading, error } = useShopifyProductVariant(variantId)

  if (loading) return 'Loading'
  if (error) return 'Error'

  return (
    <div className="variant-card">
      <h3 className="variant-card__title">{product.title}</h3>
      <p className="variant-card__price">{product.price}</p>
    </div>
  )
}
```
