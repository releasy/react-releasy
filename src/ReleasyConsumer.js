// @flow
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Environment } from 'relay-runtime';
import invariant from 'invariant';

type Props = {
  children: React.Node,
};

class ReleasyConsumer extends React.PureComponent<Props> {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  static contextTypes = {
    environment: PropTypes.instanceOf(Environment).isRequired,
  };

  constructor(props: Props) {
    invariant(props.children, 'ReleasyConsumer: missing "children"');

    super(props);
  }

  render() {
    const { children } = this.props;

    return React.Children.map(children, child =>
      React.cloneElement(child, { environment: this.context.environment }),
    );
  }
}

export default ReleasyConsumer;
