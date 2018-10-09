import { CacheConfig, RequestNode, UploadableMap, Variables, GraphQLResponse } from 'relay-runtime';

import { LinkInterface } from '../../Config';
import Link, { LinkProps } from '../Link/Link';
import { hasExistingRecord, readRecord, writeRecord } from './records';

enum VCRMode {
  AUTO = 'Auto',
  RECORD = 'Record',
  REPLAY = 'Replay',
}

type VCRProps = LinkProps & {
  mode?: VCRMode,
};

class VCR implements LinkInterface {
  static MODE = VCRMode;

  mode: VCRMode;
  link: Link;

  constructor({ mode, ...linkProps }: VCRProps) {
    this.mode = mode || VCRMode.AUTO;
    this.link = new Link(linkProps);
  }

  recordMode = async (
    request: RequestNode,
    variables: Variables,
    cacheConfig: CacheConfig,
    uploadables?: UploadableMap,
  ): Promise<GraphQLResponse> => {
    const data = await this.link.fetch(request, variables, cacheConfig, uploadables);

    writeRecord(request, variables, data);

    return data;
  }

  replayMode = async (
    request: RequestNode,
    variables: Variables,
  ): Promise<GraphQLResponse> => {
    const data = await readRecord(request, variables);

    writeRecord(request, variables, data);

    return data;
  }

  autoMode = async (
    request: RequestNode,
    variables: Variables,
    cacheConfig: CacheConfig,
    uploadables?: UploadableMap,
  ): Promise<GraphQLResponse> => {
    const hasData = await hasExistingRecord(request, variables);
    if (hasData) {
      return this.replayMode(request, variables);
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
      return this.replayMode(request, variables);
    }

    return this.autoMode(request, variables, cacheConfig, uploadables);
  }
}

export default VCR;
