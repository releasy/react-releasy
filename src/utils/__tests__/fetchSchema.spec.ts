import fetchSchema from '../fetchSchema';
import fse from 'fs-extra';

it('should fetch the schema', async () => {
  const schema = require('./schema.json');

  global.fetch.mockResponseOnce(
    JSON.stringify(schema),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    },
  );

  const config = {
    url: 'https://swapi-releasy.herokuapp.com/',
    path: './tests/data/schema.graphql',
  };

  await fetchSchema(config);

  const pathExists = await fse.pathExists(config.path);

  expect(pathExists).toBe(true);
});
