import { RequestNode, UploadableMap, Variables } from 'relay-runtime';

const getRequestBodyWithUploadables = (
  request: RequestNode,
  variables: Variables,
  uploadables: UploadableMap,
) => {
  const formData = new FormData();
  formData.append('query', request.text);
  formData.append('variables', JSON.stringify(variables));

  Object.keys(uploadables).forEach((key) => {
    formData.append(key, uploadables[key]);
  });

  return formData;
};

const getRequestBodyWithoutUplodables = (request: RequestNode, variables: Variables): string => {
  return JSON.stringify({
    variables,
    query: request.text,
  });
};

const getRequestBody = (
  request: RequestNode,
  variables: Variables,
  uploadables?: UploadableMap,
): FormData | string => {
  if (uploadables) {
    return getRequestBodyWithUploadables(request, variables, uploadables);
  }

  return getRequestBodyWithoutUplodables(request, variables);
};

export default getRequestBody;
