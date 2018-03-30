export { getEnvironment } from './store';

export { default as Config } from './Config';
export type { CacheInterface, LinkInterface } from './Config';

export { default as ReleasyProvider } from './ReleasyProvider';
export { default as ReleasyConsumer } from './ReleasyConsumer';
export { default as withReleasy } from './withReleasy';

export { default as query } from './query';
export type { Props as QueryRenderProps } from './query';

export { default as InMemoryCache } from './cache/InMemoryCache';

export { default as Link } from './link/Link';
export { default as ClientLink } from './link/ClientLink';
export { default as ServerLink } from './link/ServerLink';
