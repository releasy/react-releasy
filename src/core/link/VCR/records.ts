import fse from 'fs-extra';
import { RequestNode, Variables, GraphQLResponse } from 'relay-runtime';
import stableCopy from 'relay-runtime/lib/stableCopy.js';
import stringHash from 'string-hash';

const RECORDS_FOLDER = './__vcr__';

const getPath = (request: RequestNode, variables: Variables): string => {
  const copy = stableCopy({
    variables,
    query: request.text,
  });

  const { name } = request;
  const hash = stringHash(JSON.stringify(copy)).toString();

  return `${RECORDS_FOLDER}/${name}_${hash}.json`;
};

export const clearRecords = (): Promise<void> => {
  return fse.emptyDir(RECORDS_FOLDER);
};

export const hasExistingRecord = (request: RequestNode, variables: Variables): Promise<boolean> => {
  const path = getPath(request, variables);

  return fse.pathExists(path);
};

export const readRecord = (
  request: RequestNode,
  variables: Variables,
): Promise<GraphQLResponse> => {
  const path = getPath(request, variables);

  return fse.readJson(path);
};

export const writeRecord = async (
  request: RequestNode,
  variables: Variables,
  data: GraphQLResponse,
): Promise<void> => {
  const path = getPath(request, variables);

  fse.ensureDir(RECORDS_FOLDER);

  return fse.writeJson(path, data);
};
