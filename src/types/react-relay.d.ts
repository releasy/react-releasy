export enum DataFrom {
  NETWORK_ONLY = 'NETWORK_ONLY',
  STORE_THEN_NETWORK = 'STORE_THEN_NETWORK',
}

declare module 'react-relay' {
  export interface QueryRendererProps {
    dataFrom?: DataFrom;
  }
}
