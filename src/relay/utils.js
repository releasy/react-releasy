// @flow
import type { CacheConfig, RequestNode } from 'relay-runtime';

export const isMutation = (request: RequestNode) => request.query.operation === 'mutation';

export const mustForceFetch = (cacheConfig: CacheConfig) => !!(cacheConfig && cacheConfig.force);
