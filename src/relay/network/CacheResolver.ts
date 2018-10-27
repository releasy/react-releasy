import {
  CacheConfig,
  RequestNode,
  UploadableMap,
  Variables,
  GraphQLResponse,
  Sink,
} from 'relay-runtime';

import Config from '../../core/Config';
import { isMutation, mustForceFetch } from '../utils';
import { NetworkResolverInterface } from './createNetwork';

class CacheResolver implements NetworkResolverInterface {
  config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  resolve(
    request: RequestNode,
    variables: Variables,
    cacheConfig: CacheConfig,
    uploadables: UploadableMap,
    sink: Sink<GraphQLResponse>,
  ) {
    if (isMutation(request)) {
      sink.next();
      return;
    }

    if (!this.config.cache || mustForceFetch(cacheConfig)) {
      sink.next();
      return;
    }

    const data = this.config.cache.get(request.text, variables);
    if (!data) {
      sink.next();
      return;
    }

    sink.next(data);
    sink.complete();
  }
}

export default CacheResolver;
