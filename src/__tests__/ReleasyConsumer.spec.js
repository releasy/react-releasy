import React from 'react';
import { mount, shallow } from 'enzyme';

import DumbComponent from '../../test/components/DumbComponent';
import WithMutation from '../../test/components/WithMutation';
import WithQueryRenderer from '../../test/components/WithQueryRenderer';
import mockFetch from '../../test/fixtures/fetch/mockFetch';
import createConfig from '../../test/fixtures/createConfig';
import { CONTENT_TYPE, MOCK_TYPE } from '../../test/consts';
import { delay } from '../../test/utils';

import InMemoryCache from '../cache/InMemoryCache';
import createEnvironment from '../relay/createEnvironment';
import ReleasyConsumer from '../ReleasyConsumer';

it('should render a valid ReleasyConsumer', () => {
  const config = createConfig();
  const environment = createEnvironment(config);

  const component = shallow(
    <ReleasyConsumer>
      <DumbComponent />
    </ReleasyConsumer>,
    { context: { environment } },
  );

  expect(component.instance()).toMatchSnapshot();
});

it('should thrown an error without "children"', () => {
  const renderConsumer = () => {
    shallow(<ReleasyConsumer />);
  };

  expect(renderConsumer).toThrowErrorMatchingSnapshot();
});

it('should render a loading QueryRenderer', async () => {
  const config = createConfig();
  const environment = createEnvironment(config);

  mockFetch();

  const component = mount(
    <ReleasyConsumer>
      <WithQueryRenderer />
    </ReleasyConsumer>,
    { context: { environment } },
  );

  expect(component.find(WithQueryRenderer).text()).toMatchSnapshot();
});

it('should render a success QueryRenderer', async () => {
  const config = createConfig();
  const environment = createEnvironment(config);

  mockFetch();

  const component = mount(
    <ReleasyConsumer>
      <WithQueryRenderer />
    </ReleasyConsumer>,
    { context: { environment } },
  );

  await delay(100);

  expect(component.find(WithQueryRenderer).text()).toMatchSnapshot();
});

it('should render an error QueryRenderer', async () => {
  const config = createConfig();
  const environment = createEnvironment(config);

  // let's set a different content type and payload body to see it breaking muhahaha (666)
  mockFetch({ contentType: CONTENT_TYPE.ALL, mock: MOCK_TYPE.ME_QUERY });

  const component = mount(
    <ReleasyConsumer>
      <WithQueryRenderer />
    </ReleasyConsumer>,
    { context: { environment } },
  );

  await delay(100);

  expect(component.find(WithQueryRenderer).text()).toMatchSnapshot();
});

it('should store data in the cache', async () => {
  const cache = new InMemoryCache();
  const config = createConfig({ cache });
  const environment = createEnvironment(config);

  mockFetch();

  mount(
    <ReleasyConsumer>
      <WithQueryRenderer />
    </ReleasyConsumer>,
    { context: { environment } },
  );

  await delay(100);

  expect(config.cache.store._responses.size).toBe(1);
});

it('should hit cache', async () => {
  const cache = new InMemoryCache();
  const config = createConfig({ cache });
  const environment = createEnvironment(config);

  mockFetch();

  mount(
    <ReleasyConsumer>
      <WithQueryRenderer />
    </ReleasyConsumer>,
    { context: { environment } },
  );

  await delay(100);

  mount(
    <ReleasyConsumer>
      <WithQueryRenderer />
    </ReleasyConsumer>,
    { context: { environment } },
  );

  await delay(100);

  expect(config.cache.store._responses.size).toBe(1);
});

it('should clear cache', async () => {
  const cache = new InMemoryCache();
  const config = createConfig({ cache });
  const environment = createEnvironment(config);

  const name = 'Updated John Doe';

  mockFetch();

  mount(
    <ReleasyConsumer>
      <WithQueryRenderer />
    </ReleasyConsumer>,
    { context: { environment } },
  );

  await delay(100);
  mockFetch({ mock: MOCK_TYPE.CHANGE_NAME_MUTATION });

  mount(
    <ReleasyConsumer>
      <WithMutation name={name} />
    </ReleasyConsumer>,
    { context: { environment } },
  );

  await delay(100);

  expect(config.cache.store._responses.size).toBe(0);
});
