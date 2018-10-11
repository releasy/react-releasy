import * as React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import { ChangeNameMutation, MeQuery } from '../../../tests/components';
import { createConfig } from '../../../tests/fixtures/core';
import { createQueryResponse, createMutationResponse } from '../../../tests/fixtures/relay';
import { delay } from '../../../tests/utils';

import InMemoryCache from '../../core/cache/InMemoryCache/InMemoryCache';
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

it('should store data in the cache', async () => {
  global.fetch.mockResponseOnce(
    JSON.stringify(createQueryResponse()),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    },
  );

  const cache = new InMemoryCache();
  const config = createConfig({ cache });

  mount(
    <ReleasyProvider config={config}>
      <MeQuery />
    </ReleasyProvider>,
  );

  await delay(100);

  expect(config.cache.size()).toBe(1);
});

it('should hit cache', async () => {
  global.fetch.mockResponseOnce(
    JSON.stringify(createQueryResponse()),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    },
  );

  const cache = new InMemoryCache();
  const config = createConfig({ cache });

  mount(
    <ReleasyProvider config={config}>
      <MeQuery />
    </ReleasyProvider>,
  );

  await delay(100);

  mount(
    <ReleasyProvider config={config}>
      <MeQuery />
    </ReleasyProvider>,
  );

  await delay(100);

  expect(config.cache.size()).toBe(1);
});

it('should clear cache on mutations', async () => {
  global.fetch.mockResponseOnce(
    JSON.stringify(createQueryResponse()),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    },
  );

  const cache = new InMemoryCache();
  const config = createConfig({ cache });

  mount(
    <ReleasyProvider config={config}>
      <MeQuery />
    </ReleasyProvider>,
  );

  await delay(100);

  global.fetch.mockResponseOnce(
    JSON.stringify(createMutationResponse()),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    },
  );

  mount(
    <ReleasyProvider config={config}>
      <ChangeNameMutation />
    </ReleasyProvider>,
  );

  await delay(100);

  expect(config.cache.size()).toBe(0);
});
