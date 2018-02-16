// @flow
import type { UploadableMap } from 'relay-runtime';

const getHeaders = (uploadables?: UploadableMap): Object => {
  if (uploadables) {
    return {
      Accept: '*/*',
    };
  }

  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
};

export default getHeaders;
