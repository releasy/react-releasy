// @flow
import { MOCK_TYPE } from '../../../consts';
import STORE from '../store/index';

import type { MockFetchData } from '../mockFetch';

const processMeQuery = () => {
  const me = STORE.users[0];

  return {
    data: {
      me,
    },
  };
};

type ProcessChangeNameMutationData = {
  name: string,
};

const processChangeNameMutation = ({ name }: ProcessChangeNameMutationData) => {
  const me = STORE.users[0];

  me.name = name;

  return {
    data: {
      ChangeName: {
        me,
      }
    },
  };
};

const processRequest = (mock: $Values<typeof MOCK_TYPE>, data: MockFetchData): any => {
  if (mock === MOCK_TYPE.ME_QUERY) {
    return processMeQuery();
  }

  if (mock === MOCK_TYPE.CHANGE_NAME_MUTATION) {
    return processChangeNameMutation(data);
  }

  return "";
};

export default processRequest;
