import { RequestNode } from 'relay-runtime';

const createMutationRequest = (): RequestNode => ({
  operationKind: 'mutation',
  name: 'ChangeNameMutation',
  text: `
    mutation ChangeNameMutation($input: ChangeNameInput!) {
      ChangeName(input: $input) {
        me {
          id
          name
        }
      }
    }
  `,
});

export default createMutationRequest;
