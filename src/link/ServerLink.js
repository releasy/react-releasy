// @flow
import invariant from 'invariant';

import type { CacheConfig, RequestNode, UploadableMap, Variables } from 'relay-runtime';

import Link from './Link';

import type { Props as LinkProps } from './Link';

export type Props = LinkProps;

class ServerLink {
  link: Link;
  payloads: Array<any>;

  constructor(props: Props) {
    invariant(props, 'ServerLink: missing props');

    this.link = new Link(props);
    this.payloads = [];
  }

  toJSON = (): Array<any> => this.payloads;

  fetch = async (
    request: RequestNode,
    variables: Variables,
    cacheConfig: CacheConfig,
    uploadables?: UploadableMap,
  ): ?Promise<any> => {
    const payload = await this.link.fetch(request, variables, cacheConfig, uploadables);

    this.payloads.push(payload);

    return payload;
  }
}

export default ServerLink;
