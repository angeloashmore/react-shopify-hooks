import { gql } from 'apollo-boost'

export const FragmentProductVariant = gql`
  fragment FragmentProductVariant on ProductVariant {
    id
    title
    price
    weight
    available: availableForSale
    sku
    compareAtPrice
    image {
      id
      src: originalSrc
      altText
    }
    selectedOptions {
      name
      value
    }
  }
`
