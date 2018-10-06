import {
  createCacheConfig,
  createMutationRequest,
  createMutationResponse,
  createQueryRequest,
  createQueryResponse,
  createUploadables,
  createVariables,
} from '../../../../tests/fixtures/relay';

import Link from '../Link';

it('should create a valid Link', () => {
  const link = new Link({
    url: '/graphql',
  });

  expect(link).toMatchSnapshot();
});

it('should fetch default data', async () => {
  global.fetch.mockResponseOnce(
    JSON.stringify(createQueryResponse()),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    },
  );

  const link = new Link({
    url: '/graphql',
  });

  const request = createQueryRequest();
  const variables = createVariables();
  const cacheConfig = createCacheConfig();

  const data = await link.fetch(request, variables, cacheConfig);

  expect(data).toMatchSnapshot();
});

it('should fetch data with uploadables', async () => {
  global.fetch.mockResponseOnce(
    JSON.stringify(createMutationResponse()),
    {
      status: 200,
      headers: {
        'content-type': '*/*',
      },
    },
  );

  const link = new Link({
    url: '/graphql',
  });

  const request = createMutationRequest();
  const variables = createVariables();
  const cacheConfig = createCacheConfig();
  const uploadables = createUploadables();

  const data = await link.fetch(request, variables, cacheConfig, uploadables);

  expect(data).toMatchSnapshot();
});

it('should use custom headers', async () => {
  global.fetch.mockResponseOnce(
    JSON.stringify(createQueryResponse()),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    },
  );

  const link = new Link({
    url: '/graphql',
    headers: () => ({ john: 'doe' }),
  });

  const request = createQueryRequest();
  const variables = createVariables();
  const cacheConfig = createCacheConfig();

  const data = await link.fetch(request, variables, cacheConfig);

  expect(data).toMatchSnapshot();
});
