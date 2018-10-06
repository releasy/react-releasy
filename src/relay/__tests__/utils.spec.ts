import {
  createCacheConfig,
  createMutationRequest,
  createQueryRequest,
} from '../../../tests/fixtures/relay';

import { isMutation, mustForceFetch } from '../utils';

it('should verify if is a mutation', async () => {
  const request = createMutationRequest();

  expect(isMutation(request)).toMatchSnapshot();
});

it('should verify if is not a mutation', async () => {
  const request = createQueryRequest();

  expect(isMutation(request)).toMatchSnapshot();
});

it('should verify if must force a fetch', async () => {
  const cacheConfig = createCacheConfig({ force: true });

  expect(mustForceFetch(cacheConfig)).toMatchSnapshot();
});

it('should verify if must not force a fetch', async () => {
  const cacheConfig = createCacheConfig({ force: false });

  expect(mustForceFetch(cacheConfig)).toMatchSnapshot();
});
