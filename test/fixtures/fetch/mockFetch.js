// @flow
import { CONTENT_TYPE, HTTP_STATUS, MOCK_TYPE } from '../../consts';
import parseResponse from './utils/parseResponse';
import processRequest from './utils/processRequest';

type MockFetchInput = {
  httpStatus?: $Values<typeof HTTP_STATUS>,
  contentType?: $Values<typeof CONTENT_TYPE>,
  mock?: $Values<typeof MOCK_TYPE>,
};

const mockFetch = ({
  httpStatus = HTTP_STATUS.OK,
  contentType = CONTENT_TYPE.JSON,
  mock = MOCK_TYPE.ME_QUERY,
}: MockFetchInput = {}) => {
  const response = processRequest(mock);

  fetch.mockResponseOnce(parseResponse(contentType, response), {
    status: httpStatus,
    headers: {'content-type': contentType},
  });
}

export default mockFetch;
