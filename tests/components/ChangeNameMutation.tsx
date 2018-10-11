import * as React from 'react';
import { graphql, commitMutation } from 'react-relay';

import { getEnvironment } from '../../src';

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

class ChangeNameMutation extends React.PureComponent {
  componentDidMount() {
    const environment = getEnvironment();

    commitMutation(environment, {
      mutation,
      variables: {
        input: {
          name: 'John Doe',
          clientMutationId: tempID += 1,
        },
      },
    });
  }

  render() {
    return null;
  }
}

export default ChangeNameMutation;
