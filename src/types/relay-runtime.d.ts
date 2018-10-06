import { PayloadData, PaylodError } from 'relay-runtime';

declare module 'relay-runtime' {
  // https://github.com/facebook/relay/blob/master/packages/relay-runtime/network/RelayNetworkTypes.js#L45
  export type GraphQLResponse = {
    data: PayloadData,
    errors?: Array<PayloadError>,
  };
}
