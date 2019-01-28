import { gql } from 'apollo-boost'

import { FragmentDiscountApplication } from './FragmentDiscountApplication'
import { FragmentMailingAddress } from './FragmentMailingAddress'
import { FragmentProductVariant } from './FragmentProductVariant'

export const FragmentOrder = gql`
  fragment FragmentDiscountAllocation on DiscountAllocation {
    allocatedAmount {
      amount
      currencyCode
    }
    discountApplication {
      ...FragmentDiscountApplication
    }
  }

  fragment FragmentOrderLineItem on OrderLineItem {
    customAttributes {
      key
      value
    }
    discountAllocations {
      ...FragmentDiscountAllocation
    }
    quantity
    title
    variant {
      ...FragmentProductVariant
    }
  }

  fragment FragmentFulfillmentLineItem on FulfillmentLineItem {
    lineItem {
      ...FragmentOrderLineItem
    }
    quantity
  }

  fragment FragmentFulfillment on Fulfillment {
    fulfillmentLineItems(first: 250) {
      edges {
        cursor
        node {
          ...FragmentFulfillmentLineItem
        }
      }
    }
    trackingCompany
    trackingInfo(first: 250) {
      number
      url
    }
  }

  fragment FragmentOrder on Order {
    currencyCode
    customerLocale
    customerUrl
    discountApplications(first: 250) {
      edges {
        cursor
        node {
          ...FragmentDiscountApplication
        }
      }
    }
    email
    id
    lineItems(first: 250) {
      edges {
        cursor
        node {
          ...FragmentOrderLineItem
        }
      }
    }
    name
    orderNumber
    phone
    processedAt
    shippingAddress {
      ...FragmentMailingAddress
    }
    shippingDiscountAllocations {
      ...FragmentDiscountAllocation
    }
    statusUrl
    subtotalPrice
    successfulFulfillments(first: 250) {
      ...FragmentFulfillment
    }
  }

  ${FragmentDiscountApplication}
  ${FragmentMailingAddress}
  ${FragmentProductVariant}
`
