import storage from 'local-storage-fallback';
import { GraphQLResponse } from 'relay-runtime';

import { VCRShelfInterface } from './VCR';

class VCRBrowserShelf implements VCRShelfInterface {
  get = (key: string): Promise<GraphQLResponse> => {
    return new Promise((resolve) => {
      resolve(JSON.parse(storage.getItem(key)));
    });
  }

  set = (key: string, data: GraphQLResponse): Promise<void> => {
    return new Promise((resolve) => {
      resolve(storage.setItem(key, JSON.stringify(data)));
    });
  }

  exists = (key: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      resolve(!!storage.getItem(key));
    });
  }
}

export default VCRBrowserShelf;
