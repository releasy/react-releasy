import React from 'react';
import { shallow } from 'enzyme';

import DumbComponent from '../../test/components/DumbComponent';
import createConfig from '../../test/fixtures/createConfig';

import ReleasyProvider from '../ReleasyProvider';
import { getEnvironment } from '../store';

it('should render a valid ReleasyProvider', () => {
  const config = createConfig();

  const component = shallow(
    <ReleasyProvider config={config}>
      <DumbComponent />
    </ReleasyProvider>,
  );

  expect(component.instance()).toMatchSnapshot();
});

it('ReleasyProvider should have a valid getChildContext()', () => {
  const config = createConfig();

  const component = shallow(
    <ReleasyProvider config={config}>
      <DumbComponent />
    </ReleasyProvider>,
  );

  expect(component.instance().getChildContext()).toMatchSnapshot();
});

it('should thrown an error without "config"', () => {
  const renderProvider = () => {
    shallow(
      <ReleasyProvider>
        <DumbComponent />
      </ReleasyProvider>,
    );
  };

  expect(renderProvider).toThrowErrorMatchingSnapshot();
});

it('should thrown an error without "children"', () => {
  const renderProvider = () => {
    const config = createConfig();

    shallow(<ReleasyProvider config={config} />);
  };

  expect(renderProvider).toThrowErrorMatchingSnapshot();
});


it('should be capable to get environment statically', () => {
  const config = createConfig();

  const component = shallow(
    <ReleasyProvider config={config}>
      <DumbComponent />
    </ReleasyProvider>,
  );

  expect(getEnvironment()).toMatchSnapshot();
});
