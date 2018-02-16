import mockFetch from '../../../test/fixtures/fetch/mockFetch';
import createCacheConfig from '../../../test/fixtures/relay/createCacheConfig';
import createRequest from '../../../test/fixtures/relay/createRequest';
import createUploadables from '../../../test/fixtures/relay/createUploadables';
import createVariables from '../../../test/fixtures/relay/createVariables';
import { CONTENT_TYPE, DATA } from '../../../test/consts';

import Link from '../Link';

it('should create a valid Link', () => {
  const link = new Link({
    url: '/graphql',
  });

  expect(link).toMatchSnapshot();
});

it('should thrown an error without props', () => {
  const createLink = () => {
    new Link();
  };

  expect(createLink).toThrowErrorMatchingSnapshot();
});

it('should thrown an error without "url"', () => {
  const createLink = () => {
    new Link({});
  };

  expect(createLink).toThrowErrorMatchingSnapshot();
});

it('should fetch default data', async () => {
  mockFetch();

  const link = new Link({
    url: '/graphql',
  });

  const request = createRequest();
  const variables = createVariables();
  const cacheConfig = createCacheConfig();

  const data = await link.fetch(request, variables, cacheConfig);

  expect(data).toMatchSnapshot();
});

it('should fetch data with uploadables', async () => {
  mockFetch({ contentType: CONTENT_TYPE.ALL, data: DATA.UPLOADABLE });

  const link = new Link({
    url: '/graphql',
  });

  const request = createRequest(DATA.UPLOADABLE);
  const variables = createVariables();
  const cacheConfig = createCacheConfig();
  const uploadables = createUploadables();

  const data = await link.fetch(request, variables, cacheConfig, uploadables);

  expect(data).toMatchSnapshot();
});
