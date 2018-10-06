import { Link, LinkInterface } from '../../../src';

const createLink = (): LinkInterface => {
  return new Link({
    url: '/graphql',
  });
};

export default createLink;
