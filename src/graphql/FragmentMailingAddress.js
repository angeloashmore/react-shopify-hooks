import { gql } from 'apollo-boost'

export const FragmentMailingAddress = gql`
  fragment FragmentMailingAddress on MailingAddress {
    id
    address1
    address2
    city
    company
    country
    firstName
    formatted
    lastName
    latitude
    longitude
    phone
    province
    zip
    name
    countryCode: countryCodeV2
    provinceCode
  }
`
