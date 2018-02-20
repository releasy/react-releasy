// @flow
import { MOCK_TYPE } from '../../../consts';
import STORE from '../store/index';

const processMeQuery = () => {
  return {
    data: {
      me: STORE.users[0],
    },
  };
};

const processRequest = (mock: $Values<typeof MOCK_TYPE>): any => {
  if (mock === MOCK_TYPE.ME_QUERY) {
    return processMeQuery();
  }

  return "";
};

export default processRequest;
