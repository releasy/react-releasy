import createCacheConfig from '../../../test/fixtures/relay/createCacheConfig';
import createRequest from '../../../test/fixtures/relay/createRequest';
import { DATA } from '../../../test/consts';

import { isMutation, mustForceFetch } from '../utils';

it('should verify if is a mutation', async () => {
  const request = createRequest(DATA.UPLOADABLE);

  expect(isMutation(request)).toMatchSnapshot();
});

it('should verify if is not a mutation', async () => {
  const request = createRequest(DATA.ME);

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
