# Cache

A class responsible to store/recover data without needing make any request to the server.

## Usage

```javascript
import { InMemoryCache } from 'react-releasy';

const cache = new InMemoryCache({
  ttl: 300000,
  size: 250,
});
```

## Props

- **ttl**: how long a record will keep alive in the cache *(optional)*
- **size**: how many records cache will store *(optional)*

----

[Go back](../)
