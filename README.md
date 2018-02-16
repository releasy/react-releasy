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
yarn add fbjs invariant react-relay relay-runtime react-releasy
yarn add --dev relay-devtools
```

or with NPM:

```
npm install --save fbjs invariant react-relay relay-runtime react-releasy
npm install --save-dev relay-devtools
```

## Usage

Using `Releasy` is quite simple, first we need to create an instance of our `Config` class:

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

Then we need to wrap the application with a `ReleasyProvider`:

```javascript
import { ReleasyProvider } from 'releasy-provider';

ReactDOM.render(
  <ReleasyProvider config={config}>
    <MyApplication />
  </ReleasyProvider>,
  document.getElementById('root'),
);
```

And that's all! You can start making your own queries or whatever you want with Relay.

## Documentation

See more documentation [here](docs).

## License

MIT © [Felippe Rodrigo Puhle](http://github.com/felippepuhle)
