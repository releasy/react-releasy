// @flow
import { Environment } from 'relay-runtime';

const ENVIRONMENT_KEY = 'environment';

const store: Map<string, Environment> = new Map();

export const getEnvironment = (): Environment => store.get(ENVIRONMENT_KEY);

export const setEnvironment = (environment: Environment): void => {
  store.set(ENVIRONMENT_KEY, environment);
};

export default store;
