import { CacheConfig } from 'relay-runtime';

type CreateCacheConfigInput = {
  force?: boolean,
};

const createCacheConfig = ({ force }: CreateCacheConfigInput = {}): CacheConfig => {
  return {
    force: !!force,
  };
};

export default createCacheConfig;
