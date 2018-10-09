import {
  buildClientSchema,
  printSchema,
  introspectionQuery,
} from 'graphql';
import fse from 'fs-extra';
import fetch from 'node-fetch';

type FetchSchemaInput = {
  url: string,
  path: string,
};

const fetchSchema = async (input: FetchSchemaInput): Promise<void> => {
  const { url, path } = input;

  const response = await fetch(url, {
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

  fse.ensureFile(path);

  return fse.writeFile(path, schema);
};

export default fetchSchema;
