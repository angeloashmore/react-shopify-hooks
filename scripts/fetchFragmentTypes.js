const path = require('path')
const fs = require('fs')
const fetch = require('node-fetch')
const { getGraphQLConfig } = require('graphql-config')
const { get } = require('lodash/fp')

const graphqlconfig = getGraphQLConfig()
const url = get(
  'config.projects.shopify-storefront.extensions.endpoints.default.url',
  graphqlconfig
)
const headers = get(
  'config.projects.shopify-storefront.extensions.endpoints.default.headers',
  graphqlconfig
)

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    ...headers,
  },
  body: JSON.stringify({
    variables: {},
    query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
  }),
})
  .then(result => result.json())
  .then(result => {
    // here we're filtering out any type information unrelated to unions or interfaces
    const filteredData = result.data.__schema.types.filter(
      type => type.possibleTypes !== null
    )
    result.data.__schema.types = filteredData
    fs.writeFile(
      path.resolve(__dirname, '../src/__tests__/fixtures/fragmentTypes.json'),
      JSON.stringify(result.data),
      err => {
        if (err) {
          console.error('Error writing fragmentTypes file', err)
        } else {
          console.log('Fragment types successfully extracted!')
        }
      }
    )
  })
