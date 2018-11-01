import { installRelayDevTools } from 'relay-devtools';
import { Environment, RecordSource, Store } from 'relay-runtime';

import Config from '../../core/Config';
import createNetwork from '../network/createNetwork';

const createEnvironment = (config: Config): Environment => {
  if (config.devTools) {
    installRelayDevTools();
  }

  const network = createNetwork(config);

  const recordSource = new RecordSource();
  const store = new Store(recordSource);

  return new Environment({
    network,
    store,
  });
};

export default createEnvironment;
