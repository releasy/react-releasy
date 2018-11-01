import * as React from 'react';
import { graphql } from 'react-relay';

import { Query, QueryChildrenPropsType } from '../../src';
import { MeQueryResponse } from './__generated__/MeQuery.graphql';

type MeQueryRenderType = MeQueryResponse & QueryChildrenPropsType;

type MeQueryPropsType = {
  variables?: Object | Function,
};

class MeQuery extends React.PureComponent<MeQueryPropsType> {
  render() {
    const { variables } = this.props;

    return (
      <Query
        query={graphql`
          query MeQuery {
            me {
              id
              name
            }
          }
        `}
        variables={variables}
      >
        {({ me, isFetching, error, ...props }: MeQueryRenderType) => {
          if (error) {
            return <div>error</div>;
          }
          if (isFetching) {
            return <div>loading</div>;
          }
          if (!me) {
            return <div>empty</div>;
          }

          return <div>{me.id}: {me.name}</div>;
        }}
      </Query>
    );
  }
}

export default MeQuery;
