// @flow
import * as React from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import { Environment } from 'relay-runtime';

type Props = {
  environment: Environment,
};

const createWithRelayQueryRenderer = (): React.ComponentType<Props> => {
  class WithRelayQueryRenderer extends React.PureComponent<Props> {
    render() {
      const { environment } = this.props;

      return (
        <QueryRenderer
          environment={environment}
          query={graphql`
          query createWithRelayQueryRendererMeQuery {
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

  return WithRelayQueryRenderer;
}

export default createWithRelayQueryRenderer;
