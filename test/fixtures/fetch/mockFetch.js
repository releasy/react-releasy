// @flow
import { CONTENT_TYPE, DATA, HTTP_STATUS } from '../../consts';
import me from './data/me';

const parseResponse = (contentType: $Values<typeof CONTENT_TYPE>, response: any): any => {
  if (contentType === CONTENT_TYPE.JSON) {
    return JSON.stringify(response);
  }

  return response;
}

const getMockedResponse = (data: $Values<typeof DATA>): any => {
  if (data === DATA.ME) {
    return me;
  }

  return "";
};

type MockFetchInput = {
  httpStatus?: $Values<typeof HTTP_STATUS>,
  contentType?: $Values<typeof CONTENT_TYPE>,
  data?: $Values<typeof DATA>,
};

const mockFetch = ({
  httpStatus = HTTP_STATUS.OK,
  contentType = CONTENT_TYPE.JSON,
  data = DATA.ME,
}: MockFetchInput = {}) => {
  const response = getMockedResponse(data);

  fetch.mockResponseOnce(parseResponse(contentType, response), {
    status: httpStatus,
    headers: {'content-type': contentType},
  });
}

export default mockFetch;
