// @flow
import invariant from 'invariant';

import type { CacheConfig, GraphQLResponse, RequestNode, UploadableMap, Variables } from 'relay-runtime';

import createEnvironment from './relay/createEnvironment';
import { setEnvironment } from './store';

export type LinkInterface = {|
  fetch: (
    request: RequestNode,
    variables: Variables,
    cacheConfig: CacheConfig,
    uploadables?: UploadableMap,
  ) => ?Promise<any>,
|};

export type CacheInterface = {|
  get: (queryID: string, variables: Variables) => ?GraphQLResponse,
  set: (queryID: string, variables: Variables, payload: GraphQLResponse) => void,
  clear: () => void,
|};

type Props = {
  link: LinkInterface,
  cache?: CacheInterface,
  devTools?: boolean,
  networkLogger?: boolean,
};

class Config {
  link: LinkInterface;
  cache: ?CacheInterface;
  devTools: boolean;
  networkLogger: boolean;

  constructor(props: Props) {
    invariant(props, 'Config: missing props');
    invariant(props.link, 'Config: missing "link"');

    this.link = props.link;
    this.cache = props.cache || null;
    this.devTools = props.devTools || false;
    this.networkLogger = props.networkLogger || false;

    setEnvironment(createEnvironment(this));
  }
}

export default Config;
