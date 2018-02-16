// @flow
import type { UploadableMap } from 'relay-runtime';

const createUploadables = (length?: number = 1): UploadableMap => {
  return Array.from({ length }, (_, index) => {
    const parts = [];
    const filename = `test-${index}.txt`;

    return new File(parts, filename);
  });
};

export default createUploadables;