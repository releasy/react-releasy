import InMemoryCache from '../cache/InMemoryCache';
import Link from '../link/Link';
import Config from '../Config';

it('should create a valid Config', () => {
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

it('should thrown an error without props', () => {
  const createConfig = () => {
    new Config();
  };

  expect(createConfig).toThrowErrorMatchingSnapshot();
});

it('should thrown an error without "link"', () => {
  const createConfig = () => {
    new Config({});
  };

  expect(createConfig).toThrowErrorMatchingSnapshot();
});
