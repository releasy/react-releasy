// @flow
import users from './users';

import type { UserType } from './users';

type StoreType = {
  users: Array<UserType>,
};

const STORE: StoreType = {
  users,
};

export default STORE;
