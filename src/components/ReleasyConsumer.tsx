import * as React from 'react';

import GlobalContext, { GlobalContextValueType } from '../contexts/GlobalContext';

type ReleasyConsumerPropsType = {
  children: React.ReactNode,
};

class ReleasyConsumer extends React.PureComponent<ReleasyConsumerPropsType> {
  render() {
    const { children } = this.props;

    return (
      <GlobalContext.Consumer>
        {(globalContextValue: GlobalContextValueType) =>
          React.Children.map(children, (child: React.ReactElement<any>) =>
            React.cloneElement(child, globalContextValue),
          )
        }
      </GlobalContext.Consumer>
    );
  }
}

export default ReleasyConsumer;
