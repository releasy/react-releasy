// @flow
import invariant from 'invariant';

import type { CacheConfig, RequestNode, UploadableMap, Variables } from 'relay-runtime';

import Link from './Link';

import type { Props as LinkProps } from './Link';

export type Props = LinkProps & {
  payloads: Array<any>,
};

class ClientLink {
  link: Link;
  payloads: Array<any>;

  constructor(props: Props) {
    invariant(props, 'ClientLink: missing props');
    invariant(props.payloads, 'ClientLink: missing "payloads"');

    this.link = new Link(props);
    this.payloads = [...props.payloads];
  }

  fetch = async (
    request: RequestNode,
    variables: Variables,
    cacheConfig: CacheConfig,
    uploadables?: UploadableMap,
  ): ?Promise<any> => {
    if (this.payloads.length) {
      return this.payloads.shift();
    }

    return this.link.fetch(request, variables, cacheConfig, uploadables);
  }
}

export default ClientLink;
