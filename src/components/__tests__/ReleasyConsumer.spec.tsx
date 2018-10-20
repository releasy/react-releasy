import * as React from 'react';
import { mount } from 'enzyme';

import { createConfig } from '../../../tests/fixtures/core';

import createEnvironment from '../../relay/environment/createEnvironment';
import ReleasyConsumer from '../ReleasyConsumer';

it('should render a valid ReleasyConsumer', () => {
  const config = createConfig();
  const environment = createEnvironment(config);

  const component = mount(
    <ReleasyConsumer>
      <div />
    </ReleasyConsumer>,
    { context: { environment } },
  );

  expect(component.instance()).toMatchSnapshot();
});
