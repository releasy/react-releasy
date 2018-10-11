import { CacheConfig, RequestNode, UploadableMap, Variables, GraphQLResponse } from 'relay-runtime';
import invariant from 'invariant';

export interface LinkInterface {
  fetch: (
    request: RequestNode,
    variables: Variables,
    cacheConfig: CacheConfig,
    uploadables: UploadableMap,
  ) => Promise<GraphQLResponse>;
}

export interface CacheInterface {
  get: (queryID: string, variables: Variables) => GraphQLResponse;
  set: (queryID: string, variables: Variables, payload: GraphQLResponse) => void;
  clear: () => void;
  size: () => number;
}

type ConfigPropsType = {
  link: LinkInterface,
  cache?: CacheInterface,
  devTools?: boolean,
  networkLogger?: boolean,
};

class Config {
  link: LinkInterface;
  cache: CacheInterface;
  devTools: boolean;
  networkLogger: boolean;

  constructor(props: ConfigPropsType) {
    invariant(props, 'Config: missing props');
    invariant(props.link, 'Config: missing "link"');

    this.link = props.link;
    this.cache = props.cache || null;
    this.devTools = props.devTools || false;
    this.networkLogger = props.networkLogger || false;
  }
}

export default Config;
