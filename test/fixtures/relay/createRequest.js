// @flow
import { MOCK_TYPE } from '../../consts';

import type { RequestNode } from 'relay-runtime';

type RequestsType = {
  [$Values<typeof MOCK_TYPE>]: RequestNode,
};

const REQUESTS: RequestsType = {
  [MOCK_TYPE.ME_QUERY]: {
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
  [MOCK_TYPE.UPLOADABLE_MUTATION]: {
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

const createRequest = (mock?: $Values<typeof MOCK_TYPE> = MOCK_TYPE.ME_QUERY): RequestNode => REQUESTS[mock];

export default createRequest;
