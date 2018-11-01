import { createConfig } from '../../../../tests/fixtures/core';
import {
  createCacheConfig,
  createMutationRequest,
  createMutationResponse,
  createQueryRequest,
  createQueryResponse,
} from '../../../../tests/fixtures/relay';
import { delay } from '../../../../tests/utils';

import { WINDOW_DATA_KEY } from '../../../utils/constants';
import { getHash } from '../../../relay/utils';
import InMemoryCache from '../../../core/cache/InMemoryCache/InMemoryCache';
import createNetwork from '../createNetwork';
import CacheResolver from '../CacheResolver';
import FetchResolver from '../FetchResolver';
import SSRResolver from '../SSRResolver';

beforeEach(() => {
  jest.clearAllMocks();
});

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

it('should resolve with SSR', async () => {
  const ssrResolver = jest.spyOn(SSRResolver.prototype, 'resolve');
  const cacheResolver = jest.spyOn(CacheResolver.prototype, 'resolve');
  const fetchResolver = jest.spyOn(FetchResolver.prototype, 'resolve');

  const request = createQueryRequest();
  const variables = {};
  const cacheConfig = createCacheConfig();
  const response = createQueryResponse();

  window[WINDOW_DATA_KEY] = { [getHash(request, variables)]: response.data };

  // make sure this is being created after releasy data is populated
  const config = createConfig();
  const network = createNetwork(config);

  (network as any).execute(request, variables, cacheConfig);

  expect(ssrResolver).toHaveBeenCalled();
  expect(cacheResolver).not.toHaveBeenCalled();
  expect(fetchResolver).not.toHaveBeenCalled();
});

it('should resolve with cache', async () => {
  const ssrResolver = jest.spyOn(SSRResolver.prototype, 'resolve');
  const cacheResolver = jest.spyOn(CacheResolver.prototype, 'resolve');
  const fetchResolver = jest.spyOn(FetchResolver.prototype, 'resolve');

  const config = createConfig({ cache: new InMemoryCache() });
  const network = createNetwork(config);

  const request = createQueryRequest();
  const variables = {};
  const cacheConfig = createCacheConfig();

  global.fetch.mockResponseOnce(
    JSON.stringify(createQueryResponse()),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    },
  );

  (network as any).execute(request, variables, cacheConfig);

  await delay(100);

  (network as any).execute(request, variables, cacheConfig);

  // first call will bypass ssr and cache
  expect(ssrResolver).toHaveBeenCalledTimes(2);
  expect(cacheResolver).toHaveBeenCalledTimes(2);
  expect(fetchResolver).toHaveBeenCalledTimes(1);
});

it('shouldn\'t resolve with cache and also clear the cache on mutations', async () => {
  const ssrResolver = jest.spyOn(SSRResolver.prototype, 'resolve');
  const cacheResolver = jest.spyOn(CacheResolver.prototype, 'resolve');
  const fetchResolver = jest.spyOn(FetchResolver.prototype, 'resolve');

  const config = createConfig({ cache: new InMemoryCache() });
  const network = createNetwork(config);

  const queryRequest = createQueryRequest();
  const queryVariables = {};
  const queryCacheConfig = createCacheConfig();

  global.fetch.mockResponseOnce(
    JSON.stringify(createQueryResponse()),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    },
  );

  (network as any).execute(queryRequest, queryVariables, queryCacheConfig);

  await delay(100);

  expect(config.cache.size()).toBe(1);

  const mutationRequest = createMutationRequest();
  const mutationVariables = {};
  const mutationCacheConfig = createCacheConfig();

  global.fetch.mockResponseOnce(
    JSON.stringify(createMutationResponse()),
    {
      status: 200,
      headers: {
        'content-type': '*/*',
      },
    },
  );

  (network as any).execute(mutationRequest, mutationVariables, mutationCacheConfig);

  expect(ssrResolver).toHaveBeenCalledTimes(2);
  expect(cacheResolver).toHaveBeenCalledTimes(2);
  expect(fetchResolver).toHaveBeenCalledTimes(2);

  expect(config.cache.size()).toBe(0);
});
