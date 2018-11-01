import { GraphQLResponse } from 'relay-runtime';

const createQueryResponse = (): GraphQLResponse => ({
  data: {
    me: {
      id: 'fakeViewerId',
      name: 'John Doe',
    },
  },
});

export default createQueryResponse;
