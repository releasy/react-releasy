// @flow
import * as React from 'react';

import ReleasyConsumer from './ReleasyConsumer';

const withReleasy = (WrappedComponent: React.ComponentType<*>): React.ComponentType<*> => {
  // eslint-disable-next-line
  class WithReleasy extends React.PureComponent<$FlowFixMe> {
    render() {
      return (
        <ReleasyConsumer>
          <WrappedComponent {...this.props} />
        </ReleasyConsumer>
      );
    }
  }

  return WithReleasy;
};

export default withReleasy;
