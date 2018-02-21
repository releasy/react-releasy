// @flow
import users from './users';

import type { User } from './users';

type StoreType = {
  users: Array<User>,
};

const STORE: StoreType = {
  users,
};

export default STORE;
