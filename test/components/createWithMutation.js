// @flow
import * as React from 'react';
import { Environment } from 'relay-runtime';

import ChangeNameMutation from './ChangeNameMutation';

type Props = {
  environment: Environment,
};

type CreateWithMutationInput = {
  name: string,
}

const createWithMutation = ({ name }: CreateWithMutationInput): React.ComponentType<Props> => {
  class WithMutation extends React.PureComponent<Props> {
    componentDidMount() {
      const { environment } = this.props;

      ChangeNameMutation.commit(environment, name);
    }

    render() {
      return null;
    }
  }

  return WithMutation;
}

export default createWithMutation;
