# ReleasyProvider

The root component.

## Usage

First create an instance of `Config`:

```javascript
import { Config, Link } from 'react-releasy';

const link = new Link({
  url: 'https://yourserveraddress.com/graphql',
});

const config = new Config({
  link,
});
```

Then wrap the application:

```javascript
import { ReleasyProvider } from 'react-releasy';

ReactDOM.render(
  <ReleasyProvider config={config}>
    <MyApplication />
  </ReleasyProvider>,
  document.getElementById('root'),
);
```

After this we can inject the `Relay` `environment` into our components using [withReleasy](../hocs/withReleasy.md), or even getting it directly:

```javascript
import { getEnvironment } from 'react-releasy';


const environment = getEnvironment();
```

## Props

- **config**: see [Config](../classes/Config.md)

----

[Go back](../)
