// @flow
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { QueryRenderer } from 'react-relay';
import { Environment } from 'relay-runtime';

import type { GraphQLTaggedNode, Variables } from 'relay-runtime';

export type Props = {
  error: ?Error,
  retry: ?() => void,
  loading: boolean,
};

export type VariablesResolver =  Variables | (props: Object) => Variables;

const query = (
  queryParam: GraphQLTaggedNode,
  variablesParam?: VariablesResolver,
) => (WrappedComponent: React.ComponentType<*>): React.ComponentType<Props> => {
  class Query extends React.PureComponent<$FlowFixMe> {
    static contextTypes = {
      environment: PropTypes.instanceOf(Environment).isRequired,
    };

    render() {
      const { environment } = this.context;

      const variables = typeof variablesParam === 'function' ? variablesParam(this.props) : variablesParam;

      return (
        <QueryRenderer
          environment={environment}
          query={queryParam}
          variables={variables}
          render={({ props, error, retry }) => {
            return (
              <WrappedComponent
                {...this.props}
                {...props}
                error={error}
                retry={retry}
                loading={!props && !error}
              />
            );
          }}
        />
      );
    }
  }

  return Query;
};

export default query;
