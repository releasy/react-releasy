import {
  createQueryRequest,
  createUploadables,
  createVariables,
} from '../../../../tests/fixtures/relay';

import getRequestBody from '../getRequestBody';

it('should create default request body', () => {
  const request = createQueryRequest();
  const variables = createVariables();

  const body = getRequestBody(request, variables);

  expect(body).toMatchSnapshot();
});

it('should create request body for uploadables', () => {
  const request = createQueryRequest();
  const variables = createVariables();
  const uploadables = createUploadables();

  const body = getRequestBody(request, variables, uploadables);

  expect(body).toMatchSnapshot();
});