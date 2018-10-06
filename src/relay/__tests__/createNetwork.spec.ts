import { createConfig } from '../../../tests/fixtures/core';

import InMemoryCache from '../../core/cache/InMemoryCache';
import createNetwork from '../createNetwork';

it('should create default Network', () => {
  const config = createConfig();

  const network = createNetwork(config);

  expect(network).toMatchSnapshot();
});

it('should create Network with networkLogger', () => {
  const config = createConfig({ networkLogger: true });

  const network = createNetwork(config);

  expect(network).toMatchSnapshot();
});

it('should create Network with cache', () => {
  const config = createConfig({ cache: new InMemoryCache() });

  const network = createNetwork(config);

  expect(network).toMatchSnapshot();
});
