import { gql } from 'apollo-boost'

export const QueryShopPolicy = gql`
  fragment FragmentPolicy on ShopPolicy {
    id
    title
    url
    body
  }

  query {
    shop {
      privacyPolicy {
        ...FragmentPolicy
      }
      termsOfService {
        ...FragmentPolicy
      }
      refundPolicy {
        ...FragmentPolicy
      }
    }
  }
`
