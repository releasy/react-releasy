import {
  buildClientSchema,
  printSchema,
  introspectionQuery,
} from 'graphql';

import { IS_NODE } from '../utils/constants';

type FetchSchemaInput = {
  url: string,
  dir: string,
  filename?: string,
};

type FetchSchemaOutput = {
  path: string,
};

const fetchSchema = async (input: FetchSchemaInput): Promise<FetchSchemaOutput> => {
  if (!IS_NODE) {
    throw new Error('Node.JS environments only!');
  }

  const fs = require('fs');
  const fetchWithRetries = require('fbjs/lib/fetchWithRetries');

  const { url, dir, filename = 'schema.graphql' } = input;

  const response = await fetchWithRetries(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: introspectionQuery,
    }),
  });

  const result = await response.json();

  const clientSchema = buildClientSchema(result.data);
  const schema = printSchema(clientSchema);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  const path = `${dir}/${filename}`;

  fs.writeFileSync(path, schema);

  return {
    path,
  };
};

export default fetchSchema;
