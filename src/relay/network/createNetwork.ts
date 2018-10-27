import {
  Network,
  CacheConfig,
  RequestNode,
  UploadableMap,
  Variables,
  Observable,
  Sink,
  GraphQLResponse,
} from 'relay-runtime';

import Config from '../../core/Config';
import CacheResolver from './CacheResolver';
import FetchResolver from './FetchResolver';
import SSRResolver from './SSRResolver';

export interface NetworkResolverInterface {
  resolve(
    request: RequestNode,
    variables: Variables,
    cacheConfig: CacheConfig,
    uploadables: UploadableMap,
    sink: Sink<GraphQLResponse>,
  );
}

const createNetwork = (config: Config): Network => {
  const resolvers: NetworkResolverInterface[] = [
    new SSRResolver(),
    new CacheResolver(config),
    new FetchResolver(config),
  ];

  return Network.create(
    (
      request: RequestNode,
      variables: Variables,
      cacheConfig: CacheConfig,
      uploadables?: UploadableMap,
    ) => new Promise((resolve, reject) => {
      let sink: Sink<GraphQLResponse>;
      let data: GraphQLResponse;
      let currentResolver = -1;

      Observable.create((_sink) => {
        sink = _sink;
        _sink.next();
      }).subscribe({
        next: (_data: GraphQLResponse) => {
          if (data) {
            return;
          }

          if (_data) {
            data = _data;
          }

          currentResolver += 1;

          const resolver = resolvers[currentResolver];
          if (!resolver) {
            sink.complete();
            return;
          }

          resolver.resolve(request, variables, cacheConfig, uploadables, sink);
        },
        complete: () => resolve(data),
        error: reject,
      });
    }),
  );
};

export default createNetwork;
