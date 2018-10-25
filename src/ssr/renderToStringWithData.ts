
import { ReactElement } from 'react';
import * as ReactDOM from 'react-dom/server';

import getDataFromTree from './getDataFromTree';

const renderToStringWithData = async (component: ReactElement<any>): Promise<string> => {
  await getDataFromTree(component);
  return ReactDOM.renderToString(component);
};

export default renderToStringWithData;
