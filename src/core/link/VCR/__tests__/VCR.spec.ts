import {
  createCacheConfig,
  createQueryRequest,
  createQueryResponse,
  createVariables,
} from '../../../../../tests/fixtures/relay';

import { clearRecords, readRecord } from '../records';
import VCR from '../VCR';

beforeEach(clearRecords);

it('should create a valid default VCR', () => {
  const vcr = new VCR({
    url: '/graphql',
  });

  expect(vcr).toMatchSnapshot();
});

it('should save data on record mode and retrieve data on replay mode', async () => {
  global.fetch.mockResponseOnce(
    JSON.stringify(createQueryResponse()),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    },
  );

  const request = createQueryRequest();
  const variables = createVariables();
  const cacheConfig = createCacheConfig();

  const vcrWithRecordMode = new VCR({
    url: '/graphql',
    mode: VCR.MODE.RECORD,
  });

  expect(vcrWithRecordMode).toMatchSnapshot();

  const recordFetchData = await vcrWithRecordMode.fetch(request, variables, cacheConfig);
  const recordCacheData = await readRecord(request, variables);

  expect(recordFetchData).toEqual(recordCacheData);
  expect(recordCacheData).toMatchSnapshot();

  const vcrWithReplayMode = new VCR({
    url: '/graphql',
    mode: VCR.MODE.REPLAY,
  });

  expect(vcrWithReplayMode).toMatchSnapshot();

  const replayFetchData = await vcrWithReplayMode.fetch(request, variables, cacheConfig);

  expect(recordFetchData).toEqual(replayFetchData);
  expect(replayFetchData).toMatchSnapshot();
});

it('should save and retrieve data on auto mode', async () => {
  global.fetch.mockResponseOnce(
    JSON.stringify(createQueryResponse()),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    },
  );

  const request = createQueryRequest();
  const variables = createVariables();
  const cacheConfig = createCacheConfig();

  const vcr = new VCR({
    url: '/graphql',
  });

  const recordFetchData = await vcr.fetch(request, variables, cacheConfig);
  const replayFetchData = await vcr.fetch(request, variables, cacheConfig);

  expect(recordFetchData).toEqual(replayFetchData);
  expect(replayFetchData).toMatchSnapshot();
});
