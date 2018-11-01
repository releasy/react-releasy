import * as React from 'react';
import { shallow } from 'enzyme';

import { createConfig } from '../../../tests/fixtures/core';

import { getConfig, getEnvironment } from '../../contexts/GlobalContext';
import ReleasyProvider from '../ReleasyProvider';

it('should render a valid ReleasyProvider', () => {
  const config = createConfig();

  const component = shallow(
    <ReleasyProvider config={config}>
      <div />
    </ReleasyProvider>,
  );

  expect(component.instance()).toMatchSnapshot();
});

it('should be capable to get Config statically', () => {
  const config = createConfig();

  shallow(
    <ReleasyProvider config={config}>
      <div />
    </ReleasyProvider>,
  );

  expect(getConfig()).toMatchSnapshot();
});

it('should be capable to get Environment statically', () => {
  const config = createConfig();

  shallow(
    <ReleasyProvider config={config}>
      <div />
    </ReleasyProvider>,
  );

  expect(getEnvironment()).toMatchSnapshot();
});
