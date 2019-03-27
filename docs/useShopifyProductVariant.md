# useShopifyProductVariant

```
(productVariantId: String) => ({ productVariant?: ProductVariant, loading: Boolean, error?: Error })
```

Fetches product variant data by product variant ID.

## Arguments

- `productVariantId` - The ID of the ProductVariant to return.

## Return Fields

- `productVariant` - The ProductVariant object.
- `loading` - Boolean stating if data fetching is in progress.
- `error` - GraphQL or network error message.

## Example

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
