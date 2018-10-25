import * as React from 'react';
import { QueryRenderer } from 'react-relay';
import { GraphQLTaggedNode, Variables } from 'relay-runtime';

import { DataFrom } from '../types/react-relay.d';
import GlobalContext, { GlobalContextValueType } from '../contexts/GlobalContext';
import Config from '../core/Config';

export type QueryChildrenPropsType = {
  error?: Error,
  retry: Function,
  isFetching: boolean,
};

type QueryPropsType = {
  query: GraphQLTaggedNode,
  variables?: Variables | Function,
  children: (props: QueryChildrenPropsType) => JSX.Element,
  dataFrom?: DataFrom,
};

const Query = (props: QueryPropsType): React.ReactElement<any> => {
  const {
    query,
    variables,
    children,
    dataFrom,
  } = props;

  const getVariables = (): Variables => {
    if (typeof variables === 'function') {
      return variables(props);
    }

    return variables;
  };

  const getDataFrom = (config: Config): DataFrom => {
    if (!dataFrom && config.ssrMode === true) {
      return DataFrom.STORE_THEN_NETWORK;
    }

    return dataFrom;
  };

  return (
    <GlobalContext.Consumer>
      {({ environment, config }: GlobalContextValueType) =>
        <QueryRenderer
          environment={environment}
          query={query}
          variables={getVariables()}
          dataFrom={getDataFrom(config)}
          render={({ props: queryProps, error, retry }) => {
            return children({
              ...queryProps,
              error,
              retry,
              isFetching: !queryProps && !error,
            });
          }}
        />
      }
    </GlobalContext.Consumer>
  );
};

export default Query;
