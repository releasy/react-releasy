import React from 'react';
import { mount, shallow } from 'enzyme';

import withQuery from '../../test/components/withQuery';
import mockFetch from '../../test/fixtures/fetch/mockFetch';
import createConfig from '../../test/fixtures/createConfig';
import { CONTENT_TYPE, MOCK_TYPE } from '../../test/consts';
import { delay } from '../../test/utils';

import createEnvironment from '../relay/createEnvironment';

it('should render a loading query', async () => {
  const config = createConfig();
  const environment = createEnvironment(config);

  mockFetch();

  const WithQuery = withQuery();

  const component = mount(
    <WithQuery />,
    { context: { environment } },
  );

  expect(component.find(WithQuery).text()).toMatchSnapshot();
});

it('should render a success query', async () => {
  const config = createConfig();
  const environment = createEnvironment(config);

  mockFetch();

  const WithQuery = withQuery();

  const component = mount(
    <WithQuery />,
    { context: { environment } },
  );

  await delay(100);

  expect(component.find(WithQuery).text()).toMatchSnapshot();
});

it('should render an error query', async () => {
  const config = createConfig();
  const environment = createEnvironment(config);

  // let's set a different content type and payload body to see it breaking muhahaha (666)
  mockFetch({ contentType: CONTENT_TYPE.ALL, mock: MOCK_TYPE.ME_QUERY });

  const WithQuery = withQuery();

  const component = mount(
    <WithQuery />,
    { context: { environment } },
  );

  await delay(100);

  expect(component.find(WithQuery).text()).toMatchSnapshot();
});

it('should use a function to create variables', async () => {
  const config = createConfig();
  const environment = createEnvironment(config);

  mockFetch();

  const WithQuery = withQuery(() => ({
    customVariable: 'customValue',
  }));

  const component = shallow(
    <WithQuery />,
    { context: { environment } },
  );

  expect(component.instance()).toMatchSnapshot();
});
