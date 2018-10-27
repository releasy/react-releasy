import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { MeQuery } from '../../../tests/components';
import { createConfig } from '../../../tests/fixtures/core';
import { createQueryResponse } from '../../../tests/fixtures/relay';

import { WINDOW_DATA_KEY } from '../../utils/constants';
import ReleasyProvider from '../../components/ReleasyProvider';
import renderToStringWithData from '../renderToStringWithData';

it('should render to string with data', async () => {
  global.fetch.mockResponse(
    JSON.stringify(createQueryResponse()),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    },
  );

  const config = createConfig({ ssrMode: true });

  const html = await renderToStringWithData(
    <ReleasyProvider config={config}>
      <MeQuery />
    </ReleasyProvider>,
  );

  expect(html).toMatchSnapshot();
});

it('should hydrate with data', async () => {
  global.fetch.mockResponse(
    JSON.stringify(createQueryResponse()),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    },
  );

  const rootElement = document.createElement('div');

  const serverConfig = createConfig({ ssrMode: true });

  const html = await renderToStringWithData(
    <ReleasyProvider config={serverConfig}>
      <MeQuery />
    </ReleasyProvider>,
  );

  const data = html.match(new RegExp('<script[^>]*>(.*?)</script[^>]*>'))[1].split(' = ').pop();
  window[WINDOW_DATA_KEY] = JSON.parse(data);

  rootElement.innerHTML = html;

  const clientConfig = createConfig();

  ReactDOM.hydrate(
    <ReleasyProvider config={clientConfig}>
      <MeQuery />
    </ReleasyProvider>,
    rootElement,
    () => {
      expect(rootElement.innerHTML).toMatchSnapshot();
    },
  );
});
