// @flow
import invariant from 'invariant';
import { Environment } from 'relay-runtime';

import type { ConcreteRequest } from 'relay-runtime';

import { getEnvironment } from './store';

class SSR {
  environment: Environment;
  queries: Array<ConcreteRequest>;

  constructor(queries: Array<ConcreteRequest>) {
    invariant(queries, 'Link: missing queries');

    this.environment = getEnvironment();
    this.queries = queries;
  }

  resolve = async (): Promise<any> => {
    const promises = this.queries.map(query =>
      new Promise(resolve => {
        const node = query();

        this.environment
          .execute({ operation: { node } })
          .subscribe({
            next: resolve,
            error: resolve,
          });
      }),
    );

    console.log(promises);

    return Promise.all(promises);
  }
}

export default SSR;
