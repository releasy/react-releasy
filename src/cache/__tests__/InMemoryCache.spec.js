import { delay } from '../../../test/utils';

import InMemoryCache from '../InMemoryCache';

it('should create a default cache', () => {
  const cache = new InMemoryCache();

  expect(cache).toMatchSnapshot();
});

it('should create a custom cache', () => {
  const cache = new InMemoryCache({
    size: 100,
    ttl: 100,
  });

  expect(cache).toMatchSnapshot();
});

it('should set and get an item', () => {
  const cache = new InMemoryCache();

  const queryID = 'queryID';
  const variables = {};
  const data = 'data';

  cache.set(queryID, variables, data);

  expect(cache.get(queryID, variables)).toBe(data);
});

it('should clear the cache', () => {
  const cache = new InMemoryCache();

  const queryID = 'queryID';
  const variables = {};
  const data = 'data';

  cache.set(queryID, variables, data);
  cache.clear();

  expect(cache.store._responses.size).toBe(0);
});

it('should handle size', () => {
  const cache = new InMemoryCache({ size: 1 });

  const firstQueryID = 'firstQueryID';
  const firstVariables = {};
  const firstData = 'firstData';

  cache.set(firstQueryID, firstVariables, firstData);

  const secondQueryID = 'secondQueryID';
  const secondVariables = {};
  const secondData = 'secondData';

  cache.set(secondQueryID, secondVariables, secondData);

  expect(cache.store._responses.size).toBe(1);
});

it('should handle ttl', async () => {
  const cache = new InMemoryCache({ ttl: 10 });

  const queryID = 'queryID';
  const variables = {};
  const data = 'data';

  cache.set(queryID, variables, data);

  expect(cache.get(queryID, variables)).toBe(data);

  await delay(100);

  expect(cache.get(queryID, variables)).toBe(null);
});
