import { RequestNode } from 'relay-runtime';

const createQueryRequest = (): RequestNode => ({
  operationKind: 'query',
  name: 'MeQuery',
  text: `
    query MeQuery {
      me {
        id
        name
      }
    }
  `,
});

export default createQueryRequest;
