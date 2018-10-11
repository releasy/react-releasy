import fs from 'fs';
import path from 'path';
import { GraphQLResponse } from 'relay-runtime';

import { VCRShelfInterface } from './VCR';

export const DIR = path.join(__dirname, '__vcr__');

class VCRNodeShelf implements VCRShelfInterface {
  constructor() {
    if (!fs.existsSync(DIR)) {
      fs.mkdirSync(DIR);
    }
  }

  get = (key: string): Promise<GraphQLResponse> => {
    return new Promise((resolve, reject) => {
      const fullPath = path.join(DIR, key);

      fs.readFile(fullPath, 'utf8', (error, data) => {
        if (error) {
          return reject(error);
        }

        resolve(JSON.parse(data));
      });
    });
  }

  set = (key: string, data: GraphQLResponse): Promise<void> => {
    return new Promise((resolve, reject) => {
      const fullPath = path.join(DIR, key);

      fs.writeFile(fullPath, JSON.stringify(data), 'utf8', (error) => {
        if (error) {
          return reject(error);
        }

        resolve();
      });
    });
  }

  exists = (key: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const fullPath = path.join(DIR, key);

      resolve(fs.existsSync(fullPath));
    });
  }
}

export default VCRNodeShelf;
