
import { ReactElement } from 'react';
import * as ReactDOM from 'react-dom/server';

import { WINDOW_DATA_KEY } from '../utils/constants';
import { getHash } from '../relay/utils';
import getDataFromTree from './getDataFromTree';

type RenderOutputType = {
  html: string,
  scripts: string,
};

const renderToStringWithData = async (component: ReactElement<any>): Promise<RenderOutputType> => {
  const dataFromTree = await getDataFromTree(component);
  const byHash = dataFromTree.reduce(
    (accumulator, { request, variables, data }) => {
      const hash = getHash(request, variables);

      return {
        ...accumulator,
        [hash]: data,
      };
    },
    {},
  );

  const html = ReactDOM.renderToString(component);
  const scripts = `<script>window.${WINDOW_DATA_KEY} = ${JSON.stringify(byHash)}</script>`;

  return {
    html,
    scripts,
  };
};

export default renderToStringWithData;
