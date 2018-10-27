
import { ReactElement } from 'react';
import * as ReactDOM from 'react-dom/server';

import { WINDOW_DATA_KEY } from '../utils/constants';
import getDataFromTree from './getDataFromTree';

const renderToStringWithData = async (component: ReactElement<any>): Promise<string> => {
  const data = await getDataFromTree(component);

  const html = ReactDOM.renderToString(component);
  const script = `<script>window.${WINDOW_DATA_KEY} = ${JSON.stringify(data)}</script>`;

  return `${html}${script}`;
};

export default renderToStringWithData;
