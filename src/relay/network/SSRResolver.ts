import {
  CacheConfig,
  RequestNode,
  UploadableMap,
  Variables,
  GraphQLResponse,
  Sink,
} from 'relay-runtime';

import { IS_NODE, WINDOW_DATA_KEY } from '../../utils/constants';
import InMemoryCache from '../../core/cache/InMemoryCache/InMemoryCache';
import { isMutation } from '../utils';
import { NetworkResolverInterface } from './createNetwork';

class SSRResolver implements NetworkResolverInterface {
  cache: InMemoryCache;

  constructor() {
    this.cache = new InMemoryCache();

    const ssrData = (!IS_NODE && window[WINDOW_DATA_KEY]) || [];
    ssrData.forEach(({ operation, data }) => {
      this.cache.set(operation.node.text, operation.variables, { data });
    });
  }

  resolve = (
    request: RequestNode,
    variables: Variables,
    cacheConfig: CacheConfig,
    uploadables: UploadableMap,
    sink: Sink<GraphQLResponse>,
  ) => {
    if (isMutation(request)) {
      sink.next();
      return;
    }

    const data = this.cache.get(request.text, variables);
    if (!data) {
      sink.next();
      return;
    }

    this.cache.set(request.text, variables, null);

    sink.next(data);
    sink.complete();
  }
}

export default SSRResolver;
