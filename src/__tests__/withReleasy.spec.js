import * as React from 'react';
import { shallow } from 'enzyme';

import DumbComponent from '../../test/components/DumbComponent';

import withReleasy from '../withReleasy';

it('should render a valid component wrapped by a ReleasyConsumer', () => {
  const WithReleasy = withReleasy(DumbComponent);

  const component = shallow(<WithReleasy />);

  expect(component.instance()).toMatchSnapshot();
});
