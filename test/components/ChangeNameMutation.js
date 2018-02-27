// @flow
import { graphql, commitMutation } from 'react-relay';
import { Environment } from 'relay-runtime';

const mutation = graphql`
  mutation ChangeNameMutation($input: ChangeNameInput!) {
    ChangeName(input: $input) {
      me {
        id
        name
      }
    }
  }
`;

let tempID = 0;

const commit = (environment: Environment, name: string) => {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        name,
        clientMutationId: tempID++,
      },
    },
  });
};

export default { commit };
