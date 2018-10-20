import { createConfig } from '../../../../tests/fixtures/core';

import createEnvironment from '../createEnvironment';

it('should create default Environment', () => {
  const config = createConfig();

  const environment = createEnvironment(config);

  expect(environment).toMatchSnapshot();
});

it('should create Environment with devTools', () => {
  const config = createConfig({ devTools: true });

  const environment = createEnvironment(config);

  expect(environment).toMatchSnapshot();
});
