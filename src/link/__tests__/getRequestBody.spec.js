import createRequest from '../../../test/fixtures/relay/createRequest';
import createUploadables from '../../../test/fixtures/relay/createUploadables';
import createVariables from '../../../test/fixtures/relay/createVariables';

import getRequestBody from '../getRequestBody';

it('should create default request body', () => {
  const request = createRequest();
  const variables = createVariables();

  const body = getRequestBody(request, variables);

  expect(body).toMatchSnapshot();
});

it('should create request body for uploadables', () => {
  const request = createRequest();
  const variables = createVariables();
  const uploadables = createUploadables();

  const body = getRequestBody(request, variables, uploadables);

  expect(body).toMatchSnapshot();
});
