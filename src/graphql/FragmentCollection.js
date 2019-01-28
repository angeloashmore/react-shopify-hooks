import { gql } from 'apollo-boost'

export const FragmentCollection = gql`
  fragment FragmentCollection on Collection {
    id
    handle
    description
    descriptionHtml
    updatedAt
    title
    image {
      id
      src: originalSrc
      altText
    }
  }
`
