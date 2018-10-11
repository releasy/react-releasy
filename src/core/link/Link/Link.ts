import { CacheConfig, RequestNode, UploadableMap, Variables, GraphQLResponse } from 'relay-runtime';
import invariant from 'invariant';
import fetchWithRetries from 'fbjs/lib/fetchWithRetries';

import { LinkInterface } from '../../Config';
import getHeaders from './getHeaders';
import getRequestBody from './getRequestBody';

export type LinkPropsType = {
  url: string,
  fetchTimeout?: number,
  retryDelays?: number[],
  headers?: Object | Function,
};

class Link implements LinkInterface {
  url: string;
  fetchTimeout: number;
  retryDelays: number[];
  headers: Object | Function;

  constructor(props: LinkPropsType) {
    invariant(props, 'Link: missing props');
    invariant(props.url, 'Link: missing "url"');

    this.url = props.url;
    this.headers = props.headers || {};
    this.fetchTimeout = props.fetchTimeout || 30000;
    this.retryDelays = props.retryDelays || [1000, 3000, 5000, 10000];
  }

  fetch = (
    request: RequestNode,
    variables: Variables,
    cacheConfig: CacheConfig,
    uploadables?: UploadableMap,
  ): Promise<GraphQLResponse> => {
    return new Promise(async (resolve) => {
      const customHeaders = typeof this.headers === 'function' ? this.headers() : this.headers;

      const headers = {
        ...getHeaders(uploadables),
        ...customHeaders,
      };

      const body = getRequestBody(request, variables, uploadables);

      const response = await fetchWithRetries(this.url, {
        headers,
        body,
        method: 'POST',
        fetchTimeout: this.fetchTimeout,
        retryDelays: this.retryDelays,
      });

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        resolve(response.json());
        return;
      }

      resolve(response.text());
    });
  }
}

export default Link;
