import { createUploadables } from '../../../../tests/fixtures/relay';

import getHeaders from '../getHeaders';

it('should create default headers', () => {
  const headers = getHeaders();

  expect(headers).toMatchSnapshot();
});

it('should create headers for uploadables', () => {
  const uploadables = createUploadables();

  const headers = getHeaders(uploadables);

  expect(headers).toMatchSnapshot();
});
