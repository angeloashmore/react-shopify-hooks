import { gql } from 'apollo-boost'

export const QueryShop = gql`
  query {
    shop {
      currencyCode
      description
      moneyFormat
      name
      primaryDomain {
        host
        sslEnabled
        url
      }
    }
  }
`
