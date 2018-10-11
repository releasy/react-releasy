import * as React from 'react';
import { QueryRenderer } from 'react-relay';
import { GraphQLTaggedNode, Variables } from 'relay-runtime';

import GlobalContext, { GlobalContextValueType } from '../contexts/GlobalContext';

export type QueryChildrenPropsType = {
  error?: Error,
  retry: Function,
  isFetching: boolean,
};

type QueryPropsType = {
  query: GraphQLTaggedNode,
  variables?: Variables | Function,
  children: (props: QueryChildrenPropsType) => JSX.Element,
};

const Query = (props: QueryPropsType): React.ReactElement<any> => {
  const {
    query,
    variables,
    children,
  } = props;

  const sanitizedVariables = typeof variables === 'function' ? variables(props) : variables;

  return (
    <GlobalContext.Consumer>
      {({ environment }: GlobalContextValueType) =>
        <QueryRenderer
          environment={environment}
          query={query}
          variables={sanitizedVariables}
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
