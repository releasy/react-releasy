// @flow
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Environment } from 'relay-runtime';
import invariant from 'invariant';

import createEnvironment from './relay/createEnvironment';
import Config from './Config';
import { setEnvironment, getEnvironment } from './store';

type Props = {
  config: Config,
  children: React.Node,
};

class ReleasyProvider extends React.PureComponent<Props> {
  static propTypes = {
    config: PropTypes.instanceOf(Config).isRequired,
    children: PropTypes.element.isRequired,
  };

  static childContextTypes = {
    environment: PropTypes.instanceOf(Environment).isRequired,
  };

  constructor(props: Props) {
    invariant(props.config, 'ReleasyProvider: missing "config"');
    invariant(props.children, 'ReleasyProvider: missing "children"');

    super(props);

    setEnvironment(createEnvironment(props.config));
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
