// @flow
import type { RequestNode, UploadableMap, Variables } from 'relay-runtime';

const getRequestBodyWithUploadables = (
  request: RequestNode,
  variables: Variables,
  uploadables: UploadableMap,
) => {
  const formData = new FormData();
  formData.append('query', request.text);
  formData.append('variables', JSON.stringify(variables));

  uploadables.forEach((uploadable, key) => {
    // $FlowIgnore
    formData.append(`image${key}`, {
      name: uploadable.filename || `image${key}.jpg`,
      type: uploadable.mime || 'image/jpg',
      uri: uploadable.path,
    });
  });

  return formData;
};

const getRequestBodyWithoutUplodables = (request: RequestNode, variables: Variables): string => {
  return JSON.stringify({
    query: request.text,
    variables,
  });
};

const getRequestBody = (
  request: RequestNode,
  variables: Variables,
  uploadables: UploadableMap,
): FormData | string => {
  if (uploadables) {
    return getRequestBodyWithUploadables(request, variables, uploadables);
  }

  return getRequestBodyWithoutUplodables(request, variables);
};

export default getRequestBody;
