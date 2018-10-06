import * as React from 'react';

import GlobalContext, { GlobalContextValueType } from '../contexts/GlobalContext';

type ReleasyConsumerPropsType = {
  children: React.ReactNode,
};

const ReleasyConsumer = ({
  children,
}: ReleasyConsumerPropsType): React.ReactElement<GlobalContextValueType> => (
  <GlobalContext.Consumer>
    {(globalContextValue: GlobalContextValueType) =>
      React.Children.map(children, (child: React.ReactElement<any>) =>
        React.cloneElement(child, globalContextValue),
      )
    }
  </GlobalContext.Consumer>
);

export default ReleasyConsumer;
