import { CacheConfig, RequestNode } from 'relay-runtime';

export const isMutation = (request: RequestNode) => request.operationKind === 'mutation';

export const mustForceFetch = (cacheConfig: CacheConfig) => !!(cacheConfig && cacheConfig.force);
