<h1 align="center">
  <img src="https://avatars2.githubusercontent.com/u/36305983?s=400&u=b5b74ead3bce6d56e6aba796e4a0830f6f54f50a&v=4" width="24" />
  Releasy
</h1>

<p align="center">Relay with zero-configuration.</p>

<p align="center">
  <a href="https://travis-ci.org/releasy/react-releasy"><img src="https://travis-ci.org/releasy/react-releasy.svg?branch=master"></a>
  <a href="https://codecov.io/gh/releasy/react-releasy"><img src="https://img.shields.io/codecov/c/github/releasy/react-releasy.svg"></a>
  <a href="https://github.com/airbnb/javascript"><img src="https://img.shields.io/badge/code%20style-airbnb-green.svg"></a>
  <a href="https://github.com/releasy/react-releasy/issues"><img src="https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat"></a>
</p>

## Installation

With Yarn:

```
yarn add react-releasy
yarn add --dev relay-devtools
```

or with NPM:

```
npm install --save react-releasy
npm install --save-dev relay-devtools
```

## Usage

Using `Releasy` is quite simple, first we need to create an instance of our [Config](docs/classes/Config.md) class:

```javascript
import { Config, InMemoryCache, Link } from 'react-releasy';

const link = new Link({
  url: 'https://yourserveraddress.com/graphql',
});

const cache = new InMemoryCache();

const config = new Config({
  link,
  cache,
});
```

Then we need to wrap the application with a [ReleasyProvider](docs/components/ReleasyProvider.md):

```javascript
import { ReleasyProvider } from 'react-releasy';

ReactDOM.render(
  <ReleasyProvider config={config}>
    <MyApplication />
  </ReleasyProvider>,
  document.getElementById('root'),
);
```

## Examples

Let's start making a simple [query](docs/hocs/query.md):

```javascript
import { graphql } from 'react-relay';
import { query } from 'react-releasy';

const MyComponent = ({ error, isFetching, me }) => {
  if (error) {
    return `Error: ${error.message}`;
  }

  if (isFetching) {
    return 'Loading...';
  }

  return `My name is ${me.name}`;
}

export default query(
  graphql`
    query MyComponentMeQuery {
      me {
        name
      }
    }
  `
)(MyComponent);
```

If you want to implement your own abstraction of [Relay QueryRenderer](https://facebook.github.io/relay/docs/en/query-renderer.html) or even create some [mutations](https://facebook.github.io/relay/docs/en/mutations.html), we can use [withReleasy](docs/hocs/withReleasy.md) to get the `environment`:

```javascript
import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import { withReleasy } from 'react-releasy';

const MyComponent = ({ environment }) => (
  <QueryRenderer
    environment={environment}
    query={graphql`
      query MyComponentMeQuery {
        me {
          id
        }
      }
    `}
    render={({ error, props }) => {
      if (error) {
        return error.message;
      }

      if (props) {
        return props.me.id;
      }

      return 'loading';
    }}
  />
);

export default withReleasy(MyComponent);
```

Also, we can get it directly using `getEnvironment`:

```javascript
import { graphql, commitMutation } from 'react-relay';
import { getEnvironment } from 'react-releasy';

const environment = getEnvironment();

const mutation = graphql`
  mutation ChangeNameMutation($input: ChangeNameInput!) {
    ChangeName(input: $input) {
      me {
        id
        name
      }
    }
  }
`;

let tempID = 0;

const commit = (name) => {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        name,
        clientMutationId: tempID++,
      },
    },
  });
};

export default { commit };
```

That's all! You can start to do whatever you want and show to the world the power of Relay.

## Documentation

See more documentation [here](docs).

## License

MIT © [Felippe Rodrigo Puhle](http://github.com/felippepuhle)
