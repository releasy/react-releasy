import fetchSchema from '../fetchSchema';
import fs from 'fs';

it('should fetch the schema', async () => {
  const CONSTANTS = require('../../utils/constants');
  CONSTANTS.IS_NODE = true;

  const json = require('../../../tests/data/schema.json');

  global.fetch.mockResponseOnce(
    JSON.stringify(json),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    },
  );

  const result = await fetchSchema({
    url: '/graphql',
    dir: './tests/data',
  });

  const pathExists = fs.existsSync(result.path);

  expect(pathExists).toBe(true);
  expect(result).toMatchSnapshot();
});

it('should create the dir if it doesnt exist', async () => {
  const json = require('../../../tests/data/schema.json');

  global.fetch.mockResponseOnce(
    JSON.stringify(json),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    },
  );

  const dir = './tests/non-existing';

  const result = await fetchSchema({
    dir,
    url: '/graphql',
  });

  const dirExists = fs.existsSync(dir);

  expect(dirExists).toBe(true);

  fs.unlinkSync(result.path);
  fs.rmdirSync(dir);
});

it('should thrown an error on a non node environment', () => {
  const CONSTANTS = require('../../utils/constants');
  CONSTANTS.IS_NODE = false;

  const callFetchSchema = () => {
    return fetchSchema({
      url: '/graphql',
      dir: './tests/data',
    });
  };

  expect(callFetchSchema()).rejects.toThrowErrorMatchingSnapshot();
});
