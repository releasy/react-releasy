import { installRelayDevTools } from 'relay-devtools';
import { Environment, RecordSource, Store } from 'relay-runtime';

import Config from '../core/Config';
import createNetwork from './createNetwork';

const createEnvironment = (config: Config): Environment => {
  if (config.devTools) {
    installRelayDevTools();
  }

  const network = createNetwork(config);

  const source = new RecordSource();
  const store = new Store(source);

  return new Environment({
    network,
    store,
  });
};

export default createEnvironment;
