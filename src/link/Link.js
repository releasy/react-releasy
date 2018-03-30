// @flow
import invariant from 'invariant';
import fetchWithRetries from 'fbjs/lib/fetchWithRetries';

import type { CacheConfig, RequestNode, UploadableMap, Variables } from 'relay-runtime';

import getHeaders from './getHeaders';
import getRequestBody from './getRequestBody';

export type Props = {
  url: string,
  fetchTimeout?: number,
  retryDelays?: Array<number>,
  headers?: Object | () => Object,
};

class Link {
  url: string;
  fetchTimeout: number;
  retryDelays: Array<number>;
  headers: Object | () => Object;

  constructor(props: Props) {
    invariant(props, 'Link: missing props');
    invariant(props.url, 'Link: missing "url"');

    this.url = props.url;
    this.headers = props.headers || {};
    this.fetchTimeout = props.fetchTimeout || 30000;
    this.retryDelays = props.retryDelays || [1000, 3000, 5000, 10000];
  }

  fetch = async (
    request: RequestNode,
    variables: Variables,
    cacheConfig: CacheConfig,
    uploadables?: UploadableMap,
  ): Promise<any> => {
    const customHeaders = typeof this.headers === 'function' ? this.headers() : this.headers;

    const headers = {
      ...getHeaders(uploadables),
      ...customHeaders,
    };

    const body = getRequestBody(request, variables, uploadables);

    const response = await fetchWithRetries(this.url, {
      method: 'POST',
      fetchTimeout: this.fetchTimeout,
      retryDelays: this.retryDelays,
      headers,
      body,
    });

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
      return response.json();
    }

    return response.text();
  }
}

export default Link;
