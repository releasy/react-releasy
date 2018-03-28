# Link

A class responsible to fetch data from server.

## Usage

```javascript
import { Link } from 'react-releasy';

const link = new Link({
  url: 'https://yourserveraddress.com/graphql',
  fetchTimeout: 30000,
  retryDelays: [1000, 3000, 5000, 10000],
  headers: {},
});
```

Also, we can use a function to generate the `headers` object:

```javascript
import { Link } from 'react-releasy';

// this function would get the token inside localStorage or AsyncStorage
import { getToken } from './auth';

const link = new Link({
  url: 'https://yourserveraddress.com/graphql',
  fetchTimeout: 30000,
  retryDelays: [1000, 3000, 5000, 10000],
  headers: () => ({ token: getToken() }),
});
```

## Props

- **url**: the server address
- **fetchTimeout**: how long to wait(in ms) for a success response *(optional)*
- **retryDelays**: how long to wait(in ms) before make a new request after a failure *(optional)*
- **headers**: additional headers that will be send to the server *(optional)*

----

[Go back](../)
