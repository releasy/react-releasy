// @flow
import RelayQueryResponseCache from 'relay-runtime/lib/RelayQueryResponseCache.js';

import type { GraphQLResponse, Variables } from 'relay-runtime';

type Props = {
  ttl?: number,
  size?: number,
};

class InMemoryCache {
  store: RelayQueryResponseCache;

  constructor(props?: Props) {
    this.store = new RelayQueryResponseCache({
      size: props && props.size ? props.size : 250,
      ttl: props && props.ttl ? props.ttl : 60 * 1000 * 5, // default = 5 minutes
    });
  }

  get = (queryID: string, variables: Variables): ?GraphQLResponse => {
    return this.store.get(queryID, variables);
  }

  set = (queryID: string, variables: Variables, payload: GraphQLResponse): void => {
    this.store.set(queryID, variables, payload);
  }

  clear = (): void => {
    this.store.clear();
  }
}

export default InMemoryCache;
