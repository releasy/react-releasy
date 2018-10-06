import * as React from 'react';
import { Environment } from 'relay-runtime';

import Config from '../core/Config';

export type GlobalContextValueType = {
  config: Config,
  environment: Environment,
};

const value: GlobalContextValueType = {
  config: null,
  environment: null,
};

export const getConfig = (): Config => value.config;

export const getEnvironment = (): Environment => value.environment;

export const setConfig = (config: Config): void => {
  value.config = config;
};

export const setEnvironment = (environment: Environment): void => {
  value.environment = environment;
};

const { Provider, Consumer } = React.createContext<GlobalContextValueType>(value);

export default {
  Provider,
  Consumer,
};
