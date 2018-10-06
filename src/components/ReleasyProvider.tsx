import * as React from 'react';
import invariant from 'invariant';

import GlobalContext, {
  GlobalContextValueType,
  setConfig,
  setEnvironment,
} from '../contexts/GlobalContext';
import Config from '../core/Config';
import createEnvironment from '../relay/createEnvironment';

type ReleasyProviderPropsType = {
  config: Config,
  children: React.ReactNode,
};

type ReleasyProviderStateType = {
  globalContextValue: GlobalContextValueType,
};

class ReleasyProvider extends React.PureComponent<
  ReleasyProviderPropsType,
  ReleasyProviderStateType
> {
  constructor(props: ReleasyProviderPropsType) {
    super(props);

    invariant(props.config, 'ReleasyProvider: missing "config"');

    const { config } = props;
    const environment = createEnvironment(config);

    setConfig(config);
    setEnvironment(environment);

    this.state = {
      globalContextValue: {
        config,
        environment,
      },
    };
  }

  render() {
    const { children } = this.props;
    const { globalContextValue } = this.state;

    return (
      <GlobalContext.Provider value={globalContextValue}>
        {children}
      </GlobalContext.Provider>
    );
  }
}

export default ReleasyProvider;
