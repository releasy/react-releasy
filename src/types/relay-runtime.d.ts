import { PayloadData, PaylodError } from 'relay-runtime';

declare module 'relay-runtime' {
  export type GraphQLResponse = {
    data: PayloadData,
    errors?: Array<PayloadError>,
  };

  export type Sink<T> = {
    next: (t?: T) => void,
    error: (error: Error, isUncaughtThrownError?: boolean) => void,
    complete: () => void,
    closed: boolean,
  };

  export class RelayObservable<T> {
    static create<V>(sink: Sink<V>): RelayObservable<V>;
  }

  export var Observable: RelayObservable;
}
