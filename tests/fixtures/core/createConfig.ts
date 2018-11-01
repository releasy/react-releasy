import { Config, CacheInterface, LinkInterface } from '../../../src';

import createLink from './createLink';

type CreateConfigInput = {
  link?: LinkInterface,
  cache?: CacheInterface,
  ssrMode?: boolean,
  devTools?: boolean,
  networkLogger?: boolean,
};

const createConfig = (input: CreateConfigInput = {}): Config => {
  return new Config({
    ...input,
    link: input.link || createLink(),
  });
};

export default createConfig;
