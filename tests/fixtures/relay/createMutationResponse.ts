import { GraphQLResponse } from 'relay-runtime';

const createMutationResponse = (): GraphQLResponse => ({
  data: {
    ChangeName: {
      me: {
        id: 'fakeViewerId',
        name: 'John Doe',
      },
    },
  },
});

export default createMutationResponse;
