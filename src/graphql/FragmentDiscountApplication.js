import { gql } from 'apollo-boost'

export const FragmentDiscountApplication = gql`
  fragment FragmentDiscountApplication on DiscountApplication {
    targetSelection
    allocationMethod
    targetType
    ... on ManualDiscountApplication {
      title
      description
    }
    ... on DiscountCodeApplication {
      code
      applicable
    }
    ... on ScriptDiscountApplication {
      description
    }
    ... on AutomaticDiscountApplication {
      title
    }
  }
`
