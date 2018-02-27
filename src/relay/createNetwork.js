// @flow
import { Network } from 'relay-runtime';
import RelayNetworkLogger from 'relay-runtime/lib/RelayNetworkLogger';

import type { CacheConfig, RequestNode, UploadableMap, Variables } from 'relay-runtime';

import { isMutation, mustForceFetch } from './utils';

import type { Config } from '../index';

const createNetwork = (config: Config): Network => {
  const fetchFn = config.networkLogger
    ? RelayNetworkLogger.wrapFetch(config.link.fetch)
    : config.link.fetch;

  return Network.create(
    async (
      request: RequestNode,
      variables: Variables,
      cacheConfig: CacheConfig,
      uploadables?: UploadableMap,
    ) => {
      const queryID = request.text;

      // no cache configured, just fetch the data from server
      if (!config.cache) {
        return fetchFn(request, variables, cacheConfig, uploadables);
      }

      // on mutations, clear cache and then fetch the data
      if (isMutation(request)) {
        config.cache.clear();
        return fetchFn(request, variables, cacheConfig, uploadables);
      }

      // verify if data exists on cache
      const fromCache = config.cache.get(queryID, variables);
      if (fromCache !== null && !mustForceFetch(cacheConfig)) {
        return fromCache;
      }

      const fromServer = await fetchFn(request, variables, cacheConfig, uploadables);
      if (fromServer) {
        config.cache.set(queryID, variables, fromServer);
      }

      return fromServer;
    }
  );
};

export default createNetwork;
