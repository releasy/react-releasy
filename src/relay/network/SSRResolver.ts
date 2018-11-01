import {
  CacheConfig,
  RequestNode,
  UploadableMap,
  Variables,
  GraphQLResponse,
  Sink,
} from 'relay-runtime';

import { IS_NODE, WINDOW_DATA_KEY } from '../../utils/constants';
import { getHash } from '../utils';
import { NetworkResolverInterface } from './createNetwork';

class SSRResolver implements NetworkResolverInterface {
  data: Object = {};

  constructor() {
    this.data = (!IS_NODE && window[WINDOW_DATA_KEY]) || {};
  }

  resolve(
    request: RequestNode,
    variables: Variables,
    cacheConfig: CacheConfig,
    uploadables: UploadableMap,
    sink: Sink<GraphQLResponse>,
  ) {
    const hash = getHash(request, variables);

    const data = this.data[hash];
    if (!data) {
      sink.next();
      return;
    }

    delete this.data[hash];

    sink.next({ data });
    sink.complete();
  }
}

export default SSRResolver;
