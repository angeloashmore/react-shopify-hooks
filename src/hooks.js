import React from 'react'
import ApolloClient from 'apollo-boost'
import {
  ApolloProvider,
  useApolloClient,
  useQuery,
  useMutation,
} from 'react-apollo-hooks'
import { get } from 'lodash/fp'

import { mutationResultNormalizer } from './mutationResultNormalizer'

import { QueryCheckoutNode } from './graphql/QueryCheckoutNode'
import { QueryCustomer } from './graphql/QueryCustomer'
import { QueryProductNode } from './graphql/QueryProductNode'
import { QueryProductVariantNode } from './graphql/QueryProductVariantNode'

import { MutationCustomerAccessTokenCreate } from './graphql/MutationCustomerAccessTokenCreate'
import { MutationCustomerAccessTokenDelete } from './graphql/MutationCustomerAccessTokenDelete'
import { MutationCustomerAccessTokenRenew } from './graphql/MutationCustomerAccessTokenRenew'

import { MutationCheckoutAttributesUpdateV2 } from './graphql/MutationCheckoutAttributesUpdateV2'
import { MutationCheckoutCreate } from './graphql/MutationCheckoutCreate'
import { MutationCheckoutCustomerAssociateV2 } from './graphql/MutationCheckoutCustomerAssociateV2'
import { MutationCheckoutCustomerDisassociateV2 } from './graphql/MutationCheckoutCustomerDisassociateV2'
import { MutationCheckoutDiscountCodeApplyV2 } from './graphql/MutationCheckoutDiscountCodeApplyV2'
import { MutationCheckoutDiscountCodeRemove } from './graphql/MutationCheckoutDiscountCodeRemove'
import { MutationCheckoutEmailUpdateV2 } from './graphql/MutationCheckoutEmailUpdateV2'
import { MutationCheckoutGiftCardRemoveV2 } from './graphql/MutationCheckoutGiftCardRemoveV2'
import { MutationCheckoutGiftCardsAppend } from './graphql/MutationCheckoutGiftCardsAppend'
import { MutationCheckoutLineItemsReplace } from './graphql/MutationCheckoutLineItemsReplace'
import { MutationCheckoutShippingAddressUpdateV2 } from './graphql/MutationCheckoutShippingAddressUpdateV2'
import { MutationCheckoutShippingLineUpdate } from './graphql/MutationCheckoutShippingLineUpdate'

import { MutationCustomerActivate } from './graphql/MutationCustomerActivate'
import { MutationCustomerAddressCreate } from './graphql/MutationCustomerAddressCreate'
import { MutationCustomerAddressDelete } from './graphql/MutationCustomerAddressDelete'
import { MutationCustomerAddressUpdate } from './graphql/MutationCustomerAddressUpdate'
import { MutationCustomerCreate } from './graphql/MutationCustomerCreate'
import { MutationCustomerDefaultAddressUpdate } from './graphql/MutationCustomerDefaultAddressUpdate'
import { MutationCustomerRecover } from './graphql/MutationCustomerRecover'
import { MutationCustomerReset } from './graphql/MutationCustomerReset'
import { MutationCustomerResetByUrl } from './graphql/MutationCustomerResetByUrl'
import { MutationCustomerUpdate } from './graphql/MutationCustomerUpdate'

/***
 * ShopifyProvider
 *
 * Root context provider to allow Apollo to communicate with Shopify.
 */
export const ShopifyProvider = ({
  children,
  client,
  shopName,
  storefrontAccessToken,
}) => {
  if (!client)
    client = new ApolloClient({
      uri: `https://${shopName}.myshopify.com/api/graphql`,
      headers: {
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
    })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

/***
 * useShopifyApolloClient
 *
 * Returns direct access to the Apollo client for arbitrary query execution.
 */
export { useApolloClient as useShopifyApolloClient }

/***
 * useShopifyProduct
 *
 * Provides product data for a given product ID.
 */
export const useShopifyProduct = id => {
  const { data, ...rest } = useQuery(QueryProductNode, {
    variables: { id },
    suspend: false,
  })

  return { product: get('node', data), ...rest }
}

/***
 * useShopifyProductVariant
 *
 * Provides product variant data for a given variant ID.
 */
export const useShopifyProductVariant = id => {
  const { data, ...rest } = useQuery(QueryProductVariantNode, {
    variables: { id },
    suspend: false,
  })

  return { productVariant: get('node', data), ...rest }
}

/***
 * useShopifyCustomerAccessToken
 *
 * Manages customer access token creation, renewal, and deletion.
 */
export const useShopifyCustomerAccessToken = () => {
  const mutationCustomerAccessTokenCreate = useMutation(
    MutationCustomerAccessTokenCreate
  )
  const mutationCustomerAccessTokenRenew = useMutation(
    MutationCustomerAccessTokenRenew
  )
  const mutationCustomerAccessTokenDelete = useMutation(
    MutationCustomerAccessTokenDelete
  )

  return {
    // Create a new customer access token. Returns the token.
    createCustomerAccessToken: async (email, password) => {
      const result = await mutationCustomerAccessTokenCreate({
        variables: {
          input: { email, password },
        },
      })

      return mutationResultNormalizer(
        'customerAccessTokenCreate',
        'customerAccessToken',
        result
      )
    },

    // Renew the customer access token. Returns the renewed token.
    renewCustomerAccessToken: async customerAccessToken => {
      const result = await mutationCustomerAccessTokenRenew({
        variables: {
          customerAccessToken,
        },
      })

      return mutationResultNormalizer(
        'customerAccessTokenRenew',
        'customerAccessToken',
        result
      )
    },

    // Permanently delete the customer access token.
    deleteCustomerAccessToken: async customerAccessToken => {
      const result = await mutationCustomerAccessTokenDelete({
        variables: {
          customerAccessToken,
        },
      })

      return mutationResultNormalizer(
        'customerAccessTokenDelete',
        'deletedAccessToken',
        result
      )
    },
  }
}

/***
 * useShopifyCheckout
 *
 * Fetches a checkout using the provided checkout ID and provides actions for
 * that checkout.
 */
export const useShopifyCheckout = checkoutId => {
  const { data, ...rest } = useQuery(QueryCheckoutNode, {
    variables: { id: checkoutId },
    skip: !Boolean(checkoutId),
    suspend: false,
  })

  // Mutations
  const mutationCheckoutCreate = useMutation(MutationCheckoutCreate)
  const mutationCheckoutAttributesUpdateV2 = useMutation(
    MutationCheckoutAttributesUpdateV2
  )
  const mutationCheckoutCustomerAssociateV2 = useMutation(
    MutationCheckoutCustomerAssociateV2
  )
  const mutationCheckoutCustomerDisassociateV2 = useMutation(
    MutationCheckoutCustomerDisassociateV2
  )
  const mutationCheckoutDiscountCodeApplyV2 = useMutation(
    MutationCheckoutDiscountCodeApplyV2
  )
  const mutationCheckoutDiscountCodeRemove = useMutation(
    MutationCheckoutDiscountCodeRemove
  )
  const mutationCheckoutEmailUpdateV2 = useMutation(
    MutationCheckoutEmailUpdateV2
  )
  const mutationCheckoutGiftCardsAppend = useMutation(
    MutationCheckoutGiftCardsAppend
  )
  const mutationCheckoutGiftCardRemoveV2 = useMutation(
    MutationCheckoutGiftCardRemoveV2
  )
  const mutationCheckoutLineItemsReplace = useMutation(
    MutationCheckoutLineItemsReplace
  )
  const mutationCheckoutShippingAddressUpdateV2 = useMutation(
    MutationCheckoutShippingAddressUpdateV2
  )
  const mutationCheckoutShippingLineUpdate = useMutation(
    MutationCheckoutShippingLineUpdate
  )

  return {
    // All checkout data. Data updates on successful actions.
    checkout: get('node', data),

    ...rest,

    // Collection of functions related to the product variant.
    actions: {
      // Create a new checkout.
      createCheckout: async (input = {}) => {
        const result = await mutationCheckoutCreate({
          variables: { input },
        })

        return mutationResultNormalizer('checkoutCreate', 'checkout', result)
      },

      // Update the checkout attributes.
      attributesUpdate: async input => {
        const result = await mutationCheckoutAttributesUpdateV2({
          variables: { checkoutId, input },
        })

        return mutationResultNormalizer(
          'checkoutAttributesUpdateV2',
          'checkout',
          result
        )
      },

      // Associate the checkout to a customer.
      customerAssociate: async customerAccessToken => {
        const result = await mutationCheckoutCustomerAssociateV2({
          variables: { checkoutId, customerAccessToken },
        })

        return mutationResultNormalizer(
          'checkoutCustomerAssociateV2',
          'checkout',
          result
        )
      },

      // Disssociate the checkout from any customer.
      customerDisassociate: async () => {
        const result = await mutationCheckoutCustomerDisassociateV2({
          variables: { checkoutId },
        })

        return mutationResultNormalizer(
          'checkoutCustomerDisassociateV2',
          'checkout',
          result
        )
      },

      // Apply a discount code to the checkout.
      discountCodeApply: async discountCode => {
        const result = await mutationCheckoutDiscountCodeApplyV2({
          variables: { checkoutId, discountCode },
        })

        return mutationResultNormalizer(
          'checkoutDiscountCodeApplyV2',
          'checkout',
          result
        )
      },

      // Remove any discount code from the checkout.
      discountCodeRemove: async () => {
        const result = await mutationCheckoutDiscountCodeRemove({
          variables: { checkoutId },
        })

        return mutationResultNormalizer(
          'checkoutDiscountCodeRemove',
          'checkout',
          result
        )
      },

      // Update the checkout's email address.
      emailUpdate: async email => {
        const result = await mutationCheckoutEmailUpdateV2({
          variables: { checkoutId, email },
        })

        return mutationResultNormalizer(
          'checkoutEmailUpdateV2',
          'checkout',
          result
        )
      },

      // Append gift card codes to the checkout.
      giftCardsAppend: async giftCardCodes => {
        const result = await mutationCheckoutGiftCardsAppend({
          variables: { checkoutId, giftCardCodes },
        })

        return mutationResultNormalizer(
          'checkoutGiftCardsAppend',
          'checkout',
          result
        )
      },

      // Remove the gift card code from the checkout.
      giftCardRemove: async appliedGiftCardId => {
        const result = await mutationCheckoutGiftCardRemoveV2({
          variables: { checkoutId, appliedGiftCardId },
        })

        return mutationResultNormalizer(
          'checkoutGiftCardRemoveV2',
          'checkout',
          result
        )
      },

      // Replace the checkout line items.
      lineItemsReplace: async lineItems => {
        const result = await mutationCheckoutLineItemsReplace({
          variables: { checkoutId, lineItems },
        })

        return mutationResultNormalizer(
          'checkoutLineItemsReplace',
          'checkout',
          result
        )
      },

      // Update the checkout's shipping address.
      shippingAddressUpdate: async shippingAddress => {
        const result = await mutationCheckoutShippingAddressUpdateV2({
          variables: { checkoutId, shippingAddress },
        })

        return mutationResultNormalizer(
          'checkoutShippingAddressUpdateV2',
          'checkout',
          result
        )
      },

      // Update the checkout's shipping line.
      shippingLineUpdate: async shippingRateHandle => {
        const result = await mutationCheckoutShippingLineUpdate({
          variables: { checkoutId, shippingRateHandle },
        })

        return mutationResultNormalizer(
          'checkoutShippingLineUpdate',
          'checkout',
          result
        )
      },
    },
  }
}

/***
 * useShopifyCustomer
 *
 * Fetches a customer using the provided customer access token and provides
 * actions for that customer.
 */
export const useShopifyCustomer = customerAccessToken => {
  // Nodes
  const { data, ...rest } = useQuery(QueryCustomer, {
    variables: { customerAccessToken },
    skip: !Boolean(customerAccessToken),
    suspend: false,
  })

  // Mutations
  const mutationCustomerActivate = useMutation(MutationCustomerActivate)
  const mutationCustomerAddressCreate = useMutation(
    MutationCustomerAddressCreate
  )
  const mutationCustomerAddressDelete = useMutation(
    MutationCustomerAddressDelete
  )
  const mutationCustomerAddressUpdate = useMutation(
    MutationCustomerAddressUpdate
  )
  const mutationCustomerCreate = useMutation(MutationCustomerCreate)
  const mutationCustomerDefaultAddressUpdate = useMutation(
    MutationCustomerDefaultAddressUpdate
  )
  const mutationCustomerRecover = useMutation(MutationCustomerRecover)
  const mutationCustomerReset = useMutation(MutationCustomerReset)
  const mutationCustomerResetByUrl = useMutation(MutationCustomerResetByUrl)
  const mutationCustomerUpdate = useMutation(MutationCustomerUpdate)

  return {
    // All customer data. Data updates on successful actions.
    customer: get('customer', data),

    ...rest,

    // Collection of functions related to the customer.
    actions: {
      // Create a new customer. Returns the customer
      createCustomer: async (email, password) => {
        const result = await mutationCustomerCreate({
          variables: {
            input: { email, password },
          },
        })

        return mutationResultNormalizer('customerCreate', 'customer', result)
      },

      // Activate a customer using the provided customer ID, activation token,
      // and password. Returns customer access token data.
      activateCustomer: async (id, activationToken, password) => {
        const result = await mutationCustomerActivate({
          variables: {
            id,
            input: { activationToken, password },
          },
        })

        return mutationResultNormalizer(
          'customerActivate',
          'customerAccessToken',
          result
        )
      },

      // Send a reset password email to the customer.
      recoverCustomer: async email => {
        const result = await mutationCustomerRecover({
          variables: { email },
        })

        return mutationResultNormalizer('customerRecover', false, result)
      },

      // Reset a customer's password with the provided reset token and
      // password. Returns customer access token data.
      resetCustomer: async (id, resetToken, password) => {
        const result = await mutationCustomerReset({
          variables: {
            id,
            input: { resetToken, password },
          },
        })

        return mutationResultNormalizer(
          'customerReset',
          'customerAccessToken',
          result
        )
      },

      // Reset a customer's password with the provided reset URL and password.
      // Returns customer access token data.
      resetCustomerByUrl: async (resetUrl, password) => {
        const result = await mutationCustomerResetByUrl({
          variables: { resetUrl, password },
        })

        return mutationResultNormalizer(
          'customerResetByUrl',
          'customerAccessToken',
          result
        )
      },

      // Add an address to the customer.
      addressCreate: async address => {
        const result = await mutationCustomerAddressCreate({
          variables: { customerAccessToken, address },
        })

        return mutationResultNormalizer(
          'customerAddressCreate',
          'customerAddress',
          result
        )
      },

      // Delete a customer's address using the address ID.
      addressDelete: async id => {
        const result = await mutationCustomerAddressDelete({
          variables: { customerAccessToken, id },
        })

        return mutationResultNormalizer('customerAddressDelete', false, result)
      },

      // Update a customer's address using the address ID.
      addressUpdate: async (id, address) => {
        const result = await mutationCustomerAddressUpdate({
          variables: { customerAccessToken, id, address },
        })

        return mutationResultNormalizer(
          'customerAddressUpdate',
          'customerAddress',
          result
        )
      },

      // Set a default address for the customer.
      addressDefaultAddressUpdate: async addressId => {
        const result = await mutationCustomerDefaultAddressUpdate({
          variables: { customerAccessToken, addressId },
        })

        return mutationResultNormalizer(
          'customerDefaultAddressUpdate',
          'customer',
          result
        )
      },

      // Update a customer's attributes.
      updateCustomer: async customer => {
        const result = await mutationCustomerUpdate({
          variables: { customerAccessToken, customer },
        })

        return mutationResultNormalizer('customerUpdate', 'customer', result)
      },
    },
  }
}
