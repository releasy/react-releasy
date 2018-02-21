// @flow
import React from 'react';
import { Environment } from 'relay-runtime';

import ChangeNameMutation from './ChangeNameMutation';

type Props = {
  environment: Environment,
  name: string,
};

class WithMutation extends React.PureComponent<Props> {
  componentDidMount() {
    const { environment, name } = this.props;

    ChangeNameMutation.commit(environment, name);
  }

  render() {
    return null;
  }
}

export default WithMutation;
