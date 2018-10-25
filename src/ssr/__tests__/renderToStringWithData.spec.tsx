import * as React from 'react';

import { MeQuery } from '../../../tests/components';
import { createConfig } from '../../../tests/fixtures/core';
import { createQueryResponse } from '../../../tests/fixtures/relay';

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

  const result = await renderToStringWithData(
    <ReleasyProvider config={config}>
      <MeQuery />
    </ReleasyProvider>,
  );

  expect(result).toMatchSnapshot();
});
