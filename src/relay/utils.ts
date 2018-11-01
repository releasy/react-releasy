import { RequestNode, CacheConfig, Variables } from 'relay-runtime';
import stableCopy from 'relay-runtime/lib/stableCopy.js';
import stringHash from 'string-hash';

export const isMutation = (request: RequestNode) => request.operationKind === 'mutation';

export const mustForceFetch = (cacheConfig: CacheConfig) => !!(cacheConfig && cacheConfig.force);

export const getHash = (request: RequestNode, variables: Variables): string => {
  const copy = stableCopy({
    variables: variables || {},
    query: request.text,
  });

  const { name } = request;
  const hash = stringHash(JSON.stringify(copy)).toString();

  return `${name}_${hash}`;
};
