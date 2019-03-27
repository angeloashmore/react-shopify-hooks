# useShopifyCustomerAccessToken

```
() => ({ createCustomerAccessToken: Function, renewCustomerAccessToken: Function, deleteCustomerAccessToken: Function })
```

Creates, renews, and deletes customer access tokens.

## Arguments

None

## Return Fields

- `actions` - Object of actions. See **Actions** below for details.

## Actions

### createCustomerAccessToken

```
(email: String, password: String) => ({ data: CustomerAccessToken, errors: ?Error[] })
```

Creates a new customer access token.

### renewCustomerAccessToken

```
(customerAccessToken: String) => ({ data: CustomerAccessToken, errors: ?Error[] })
```

Renews a customer access token.

### deleteCustomerAccessToken

```
(customerAccessToken: String) => ({ data: String, errors: ?Error[] })
```

Deletes a customer access token. `data` is the deleted token.

## Example

```jsx
import { Formik, Form, Field } from 'formik'
import { useShopifyCustomerAccessToken } from 'react-shopify-hooks'

// Create a new access token and save it to state.
const SignInForm = () => {
  const [token, setToken] = useState(null)
  const { createCustomerAccessToken } = useShopifyCustomerAccessToken()

  const onSubmit = ({ email, password }, { setSubmitting }) => {
    const { data } = createCustomerAccessToken(email, password)
    if (data && data.accessToken) setToken(data.accessToken)
    setSubmitting(false)
  }

  return (
    <Formik defaultValues={{ email: '', password: '' }} onSubmit={onSubmit}>
      <Form>
        <label>
          <span>Email</span>
          <Field name="email" />
        </label>
        <label>
          <span>Password</span>
          <Field name="password" type="password" />
        </label>
        <button type="submit">Sign In</button>
      </Form>
    </Formik>
  )
}
```
