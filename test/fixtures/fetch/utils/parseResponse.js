// @flow
import { CONTENT_TYPE } from '../../../consts';

const parseResponse = (contentType: $Values<typeof CONTENT_TYPE>, response: any): any => {
  if (contentType === CONTENT_TYPE.JSON) {
    return JSON.stringify(response);
  }

  return response;
}

export default parseResponse;
