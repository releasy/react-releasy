// @flow
import * as React from 'react';
import { graphql } from 'react-relay';

import { query } from '../../src';

import type { GraphQLTaggedNode } from 'relay-runtime';
import type { VariablesResolver } from '../../src/query';
import type { QueryRenderProps } from '../../src';

const withQuery = (
  variablesParam?: VariablesResolver = {},
): React.ComponentType<QueryRenderProps> => {
  class WithQuery extends React.PureComponent<QueryRenderProps> {
    render() {
      const { error, loading, me } = this.props;

      if (error) {
        return error.message;
      }

      if (loading) {
        return 'loading';
      }

      return me.id;
    }
  }

  return query(
    graphql`
      query WithQueryMeQuery {
        me {
          id
        }
      }
    `,
    variablesParam,
  )(WithQuery);
}

export default withQuery;


