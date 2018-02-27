import * as React from 'react';
import {  shallow } from 'enzyme';

import DumbComponent from '../DumbComponent';

it('should render a empty DumbComponent', () => {
  const component = shallow(<DumbComponent />);

  expect(component.instance()).toMatchSnapshot();
});
