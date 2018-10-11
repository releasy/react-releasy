import { RequestNode, Variables } from 'relay-runtime';
import stableCopy from 'relay-runtime/lib/stableCopy.js';
import stringHash from 'string-hash';

const getHash = (request: RequestNode, variables: Variables): string => {
  const copy = stableCopy({
    variables,
    query: request.text,
  });

  const { name } = request;
  const hash = stringHash(JSON.stringify(copy)).toString();

  return `${name}_${hash}`;
};

export default getHash;
