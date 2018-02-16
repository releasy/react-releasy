# Config

A configuration class.

## Usage

```javascript
import { Config, InMemoryCache, Link } from 'react-releasy';

const config = new Config({
  link: new Link({ url: 'https://yourserveraddress.com/graphql' }),
  cache: new InMemoryCache(),
  devTools: true,
  networkLogger: true,
})
```

## Props

- **link**: see [Link](Link.md)
- **cache**: see [Cache](Cache.md) *(optional)*
- **devTools**: install [Relay DevTools](https://facebook.github.io/relay/docs/en/relay-debugging.html)? *(optional)*
- **networkLogger**: log network requests? *(optional)*

----

[Go back](../)
