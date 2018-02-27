# query

An higher-order component to [Relay QueryRenderer](https://facebook.github.io/relay/docs/en/query-renderer.html).

## Usage

```javascript
import { graphql } from 'react-relay';
import { query } from 'react-releasy';

// ... more code here

export default query(
  graphql`
    query MyComponentUserQuery($id: ID!) {
      user(id: $id) {
        id
      }
    }
  `,
  {
    id: '123456',
  },
)(MyComponent);
```

Also, we can use a function to generate the `variables` object:

```javascript
export default query(
  graphql`
    query MyComponentUserQuery($id: ID!) {
      user(id: $id) {
        id
      }
    }
  `,
  ({ match }) => ({
    id: match.params.id, // getting the id from router params
  }),
)(MyComponent);
```

## Args

### The first function receives:

- the graphql tagged query
- the variables

### The last function receives:

- a `React` component class

## Injected props

- **error**: an object that will be defined if an error has occurred while fetching the query
- **retry**: a function to reload the data
- **isFetching**: a boolean that defines if data is still being fetched

----

[Go back](../)
