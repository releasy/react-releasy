// @flow
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Environment } from 'relay-runtime';
import invariant from 'invariant';

import { getEnvironment } from './store';

type Props = {
  children: React.Node,
};

class ReleasyProvider extends React.PureComponent<Props> {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  static childContextTypes = {
    environment: PropTypes.instanceOf(Environment).isRequired,
  };

  constructor(props: Props) {
    invariant(props.children, 'ReleasyProvider: missing "children"');

    super(props);
  }

  getChildContext() {
    return {
      environment: getEnvironment(),
    };
  }

  render() {
    return this.props.children;
  }
}

export default ReleasyProvider;
