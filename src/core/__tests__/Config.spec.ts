import InMemoryCache from '../cache/InMemoryCache';
import Link from '../link/Link';
import Config from '../Config';

it('should create a valid Config', () => {
  const link = new Link({
    url: '/graphql',
  });

  const config = new Config({
    link,
  });

  expect(config).toMatchSnapshot();
});

it('should create a Config with cache', () => {
  const link = new Link({
    url: '/graphql',
  });

  const cache = new InMemoryCache();

  const config = new Config({
    link,
    cache,
  });

  expect(config).toMatchSnapshot();
});
