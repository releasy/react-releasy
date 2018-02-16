// @flow
import { Config, Link } from '../../src';

import type { CacheInterface, LinkInterface } from '../../src';

const createLink = (): LinkInterface => {
  return new Link({
    url: '/graphql',
  });
}

type CreateConfigInput = {
  link?: LinkInterface,
  cache?: CacheInterface,
  devTools?: boolean,
  networkLogger?: boolean,
};

const createConfig = ({ link, cache, devTools, networkLogger }: CreateConfigInput = {}): Config => {
  return new Config({
    link: link || createLink(),
    cache: cache,
    devTools: !!devTools,
    networkLogger: !!networkLogger,
  });
};

export default createConfig;
