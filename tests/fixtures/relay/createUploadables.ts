import { UploadableMap } from 'relay-runtime';

const createUploadables = (length: number = 1): UploadableMap => {
  return Array.from({ length }, (_, index) => index).reduce(
    (accumulator, index) => {
      const parts = [];
      const filename = `test-${index}.txt`;
      const options = { lastModified: 1538847573026 };

      return {
        ...accumulator,
        [filename]: new File(parts, filename, options),
      };
    },
    {},
  );
};

export default createUploadables;
