import * as record from './record';

export type FinalReturn<F> = F extends (...args: any[]) => infer R
  ? R extends (...args: any[]) => infer S
    ? S
    : R
  : never;

export type ActionCreator<Key> =
  | ((...args: any) => { type: Key; payload: any })
  | ((...args: any[]) => (...otherArgs: any[]) => { type: Key; payload: any });

export type ActionCreators<K extends string> = {
  [key in K]: ActionCreator<key>;
};

// Ensures that action name is same as action creator name
export type ActionsUnion<
  K extends string,
  A extends ActionCreators<K>
> = FinalReturn<A[keyof A]>;

export type AnyAction = {
  type: string;
  payload: any;
};

export type UnknownAction = {
  type: unknown;
  payload: unknown;
};

export type Action<Name extends string, Payload> = {
  type: Name;
  payload: Payload;
};

export function make<Name extends string>(
  name: Name,
): { [K in Name]: () => Action<Name, undefined> };
export function make<Name extends string, Payload, Args extends any[]>(
  name: Name,
  func: (...args: Args) => Payload,
): { [K in Name]: (...args: Args) => Action<Name, Payload> };
export function make<Name extends string, Payload, Args extends any[]>(
  name: Name,
  func?: (...args: Args) => Payload,
):
  | { [K in Name]: (...args: Args) => Action<Name, Payload> }
  | { [K in Name]: () => Action<Name, undefined> } {
  if (func !== undefined) {
    return record.singleton(name, (...args: Args) => ({
      type: name,
      payload: func(...args),
    }));
  } else {
    return record.singleton(name, () => ({ type: name, payload: undefined }));
  }
}
