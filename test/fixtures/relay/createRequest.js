// @flow
import { DATA } from '../../consts';

import type { RequestNode } from 'relay-runtime';

type RequestsType = {
  [$Values<typeof DATA>]: RequestNode,
};

const REQUESTS: RequestsType = {
  [DATA.ME]: {
    query: {
      operation: 'query',
    },
    name: 'meQuery',
    text: 'query meQuery {\n' +
    '  me {\n' +
    '    id\n' +
    '  }\n' +
    '}',
  },
  [DATA.UPLOADABLE]: {
    query: {
      operation: 'mutation',
    },
    name: 'uploadableMutation',
    text: 'mutation uploadableMutation {\n' +
    '  me {\n' +
    '    id\n' +
    '  }\n' +
    '}',
  },
};

const createRequest = (data?: $Values<typeof DATA> = DATA.ME): RequestNode => REQUESTS[data];

export default createRequest;
