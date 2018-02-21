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
    name: 'MeQuery',
    text: 'query MeQuery {\n' +
    '  me {\n' +
    '    id\n' +
    '    name\n' +
    '  }\n' +
    '}',
  },
  [MOCK_TYPE.CHANGE_NAME_MUTATION]: {
    query: {
      operation: 'mutation',
    },
    name: 'ChangeNameMutation',
    text: 'mutation ChangeNameMutation($input: ChangeNameInput!) {\n' +
    '  ChangeName(input: $input) {\n' +
    '    me {\n' +
    '      id\n' +
    '      name\n' +
    '    }\n' +
    '  }\n' +
    '}',
  },
  [MOCK_TYPE.UPLOADABLE_MUTATION]: {
    query: {
      operation: 'mutation',
    },
    name: 'UploadableMutation',
    text: 'mutation UploadableMutation {\n' +
    '  me {\n' +
    '    id\n' +
    '    name\n' +
    '  }\n' +
    '}',
  },
};

const createRequest = (mock?: $Values<typeof MOCK_TYPE> = MOCK_TYPE.ME_QUERY): RequestNode => REQUESTS[mock];

export default createRequest;
