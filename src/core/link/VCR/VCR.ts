import { CacheConfig, RequestNode, UploadableMap, Variables, GraphQLResponse } from 'relay-runtime';

import { IS_NODE } from '../../../utils/constants';
import { getHash } from '../../../relay/utils';
import { LinkInterface } from '../../Config';
import Link, { LinkPropsType } from '../Link/Link';

enum VCRMode {
  AUTO = 'Auto',
  RECORD = 'Record',
  REPLAY = 'Replay',
}

export interface VCRShelfInterface {
  get(key: string): Promise<GraphQLResponse>;
  set(key: string, data: GraphQLResponse): Promise<void>;
  exists(key: string): Promise<boolean>;
}

type VCRPropsType = LinkPropsType & {
  mode?: VCRMode,
};

class VCR implements LinkInterface {
  static MODE = VCRMode;

  link: Link;
  mode: VCRMode;
  shelf: VCRShelfInterface;

  constructor({ mode, ...linkProps }: VCRPropsType) {
    this.link = new Link(linkProps);
    this.mode = mode || VCRMode.AUTO;

    const importAndCreateShelf = (): VCRShelfInterface => {
      if (IS_NODE) {
        const VCRNodeShelf = require('./VCRNodeShelf').default;
        const shelf = new VCRNodeShelf();
        return shelf;
      }

      const VCRNodeShelf = require('./VCRBrowserShelf').default;
      const shelf = new VCRNodeShelf();
      return shelf;
    };

    this.shelf = importAndCreateShelf();
  }

  recordMode = async (
    request: RequestNode,
    variables: Variables,
    cacheConfig: CacheConfig,
    uploadables?: UploadableMap,
  ): Promise<GraphQLResponse> => {
    const data = await this.link.fetch(request, variables, cacheConfig, uploadables);

    const hash = getHash(request, variables);
    await this.shelf.set(hash, data);

    return data;
  }

  replayMode = async (
    request: RequestNode,
    variables: Variables,
    cacheConfig: CacheConfig,
    uploadables?: UploadableMap,
  ): Promise<GraphQLResponse> => {
    const hash = getHash(request, variables);

    return this.shelf.get(hash);
  }

  autoMode = async (
    request: RequestNode,
    variables: Variables,
    cacheConfig: CacheConfig,
    uploadables?: UploadableMap,
  ): Promise<GraphQLResponse> => {
    const hash = getHash(request, variables);

    const exists = await this.shelf.exists(hash);
    if (exists) {
      return this.replayMode(request, variables, cacheConfig, uploadables);
    }

    return this.recordMode(request, variables, cacheConfig, uploadables);
  }

  fetch = async (
    request: RequestNode,
    variables: Variables,
    cacheConfig: CacheConfig,
    uploadables?: UploadableMap,
  ): Promise<GraphQLResponse> => {
    if (this.mode === VCRMode.RECORD) {
      return this.recordMode(request, variables, cacheConfig, uploadables);
    }

    if (this.mode === VCRMode.REPLAY) {
      return this.replayMode(request, variables, cacheConfig, uploadables);
    }

    return this.autoMode(request, variables, cacheConfig, uploadables);
  }
}

export default VCR;
