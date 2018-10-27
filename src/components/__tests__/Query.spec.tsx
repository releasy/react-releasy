import * as React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import { MeQuery } from '../../../tests/components';
import { createConfig } from '../../../tests/fixtures/core';
import { createQueryResponse } from '../../../tests/fixtures/relay';
import { delay } from '../../../tests/utils';

import ReleasyProvider from '../ReleasyProvider';

it('should render a loading Query', () => {
  global.fetch.mockResponseOnce(
    JSON.stringify(createQueryResponse()),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    },
  );

  const config = createConfig();

  const component = mount(
    <ReleasyProvider config={config}>
      <MeQuery />
    </ReleasyProvider>,
  );

  component.update();

  expect(toJson(component.find(MeQuery).find('div'))).toMatchSnapshot();
});

it('should render a success Query', async () => {
  global.fetch.mockResponseOnce(
    JSON.stringify(createQueryResponse()),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    },
  );

  const config = createConfig();

  const component = mount(
    <ReleasyProvider config={config}>
      <MeQuery />
    </ReleasyProvider>,
  );

  await delay(100);

  component.update();

  expect(toJson(component.find(MeQuery).find('div'))).toMatchSnapshot();
});

it('should use a function to create variables', async () => {
  global.fetch.mockResponseOnce(
    JSON.stringify(createQueryResponse()),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    },
  );

  const config = createConfig();

  const variables = () => ({
    customVariable: 'customValue',
  });

  const component = mount(
    <ReleasyProvider config={config}>
      <MeQuery variables={variables} />
    </ReleasyProvider>,
  );

  await delay(100);

  component.update();

  expect(toJson(component.find(MeQuery).find('div'))).toMatchSnapshot();
});
