import {
  CacheConfig,
  RequestNode,
  UploadableMap,
  Variables,
  GraphQLResponse,
  Sink,
} from 'relay-runtime';
import RelayNetworkLogger from 'relay-runtime/lib/RelayNetworkLogger';

import Config from '../../core/Config';
import { isMutation } from '../utils';
import { NetworkResolverInterface } from './createNetwork';

class FetchResolver implements NetworkResolverInterface {
  config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  async resolve(
    request: RequestNode,
    variables: Variables,
    cacheConfig: CacheConfig,
    uploadables: UploadableMap,
    sink: Sink<GraphQLResponse>,
  ) {
    const fetchFn = this.config.networkLogger
      ? RelayNetworkLogger.wrapFetch(this.config.link.fetch)
      : this.config.link.fetch;

    try {
      if (isMutation(request) && !!this.config.cache) {
        this.config.cache.clear();
      }

      const data = await fetchFn(request, variables, cacheConfig, uploadables);

      if (!isMutation(request) && !!this.config.cache) {
        this.config.cache.set(request.text, variables, data);
      }

      sink.next(data);
      sink.complete();
    } catch (error) {
      sink.error(error);
      sink.complete();
    }
  }
}

export default FetchResolver;
