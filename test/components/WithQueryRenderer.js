// @flow
import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import { Environment } from 'relay-runtime';

type Props = {
  environment: Environment,
};

class WithQueryRenderer extends React.PureComponent<Props> {
  render() {
    const { environment } = this.props;

    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query WithQueryRendererMeQuery {
            me {
              id
            }
          }
        `}
        render={({error, props}) => {
          if (error) {
            return error.message;
          }

          if (props) {
            return props.me.id;
          }

          return 'loading';
        }}
      />
    );
  }
}

export default WithQueryRenderer;
