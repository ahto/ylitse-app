import * as reduxSagaEffects from 'redux-saga/effects';

import * as remoteData from './remote-data';
import * as record from './record';

type UnpackPromise<Value> = Value extends Promise<infer U> ? U : never;

type InitAction<
  InitActionName extends string,
  F extends (...args: any[]) => any
> = {
  type: InitActionName;
  payload: Parameters<F>;
};
type InitActionCreator<
  InitActionName extends string,
  F extends (...args: any[]) => any
> = {
  [k in InitActionName]: (
    payload: Parameters<F>,
  ) => InitAction<InitActionName, F>;
};

type SuccessAction<
  InitActionName extends string,
  F extends (...args: any[]) => any
> = {
  type: InitActionName;
  payload: UnpackPromise<ReturnType<F>>;
};
type SuccessActionCreator<
  InitActionName extends string,
  F extends (...args: any[]) => any
> = {
  [k in InitActionName]: (
    payload: UnpackPromise<ReturnType<F>>,
  ) => SuccessAction<InitActionName, F>;
};

type FailAction<InitActionName extends string> = {
  type: InitActionName;
  payload: Error;
};
type FailActionCreator<InitActionName extends string> = {
  [k in InitActionName]: (payload: Error) => FailAction<InitActionName>;
};

export function makeActionCreators<
  InitActionName extends string,
  SuccessActionName extends string,
  FailureActionName extends string,
  F extends (...args: any[]) => any
>(
  initActionName: InitActionName,
  successActionName: SuccessActionName,
  failActionName: FailureActionName,
  _: F,
): InitActionCreator<InitActionName, F> &
  SuccessActionCreator<SuccessActionName, F> &
  FailActionCreator<FailureActionName> {
  const init = record.singleton(initActionName, (payload: Parameters<F>) => ({
    type: initActionName,
    payload,
  }));
  const success = record.singleton(
    successActionName,
    (payload: UnpackPromise<ReturnType<F>>) => ({
      type: successActionName,
      payload,
    }),
  );
  const fail = record.singleton(failActionName, (payload: Error) => ({
    type: failActionName,
    payload,
  }));
  return { ...init, ...success, ...fail };
}

type UnknownAction = {
  type: unknown;
  payload: unknown;
};

export function makeReducer<
  InitActionName extends string,
  SuccessActionName extends string,
  FailureActionName extends string,
  F extends (...args: any[]) => any
>(
  init: InitActionName,
  success: SuccessActionName,
  fail: FailureActionName,
  _: F,
) {
  const reducer: (
    state: remoteData.RemoteData<UnpackPromise<ReturnType<F>>>,
    action:
      | InitAction<InitActionName, F>
      | SuccessAction<SuccessActionName, F>
      | FailAction<FailureActionName>
      | UnknownAction,
  ) => remoteData.RemoteData<UnpackPromise<ReturnType<F>>> = (
    state: remoteData.RemoteData<UnpackPromise<ReturnType<F>>>,
    action:
      | InitAction<InitActionName, F>
      | SuccessAction<SuccessActionName, F>
      | FailAction<FailureActionName>
      | UnknownAction,
  ) => {
    switch (action.type) {
      case init: {
        return remoteData.loading;
      }
      case success: {
        const {
          payload,
        }: SuccessAction<SuccessActionName, F> = action as SuccessAction<
          SuccessActionName,
          F
        >;
        return remoteData.succeed(payload);
      }
      case fail: {
        const { payload }: FailAction<FailureActionName> = action as FailAction<
          FailureActionName
        >;
        return remoteData.fail(payload);
      }
      default:
        return state;
    }
  };
  return reducer;
}

export function makeSaga<
  InitActionName extends string,
  SuccessActionName extends string,
  FailureActionName extends string,
  F extends (...args: any[]) => any
>(
  initActionName: InitActionName,
  successActionName: SuccessActionName,
  failActionName: FailureActionName,
  f: F,
) {
  const actions = makeActionCreators(
    initActionName,
    successActionName,
    failActionName,
    f,
  );
  const reducer = makeReducer(
    initActionName,
    successActionName,
    failActionName,
    f,
  );
  const fetchHandler = function*(action: InitAction<InitActionName, F>) {
    try {
      const value = yield reduxSagaEffects.call(f, ...action.payload);
      yield reduxSagaEffects.put(actions[successActionName](value));
    } catch (e) {
      yield reduxSagaEffects.put(actions[failActionName](e));
    }
  };
  const saga = function*() {
    yield reduxSagaEffects.takeEvery(initActionName, fetchHandler);
  };

  return { actions, reducer, saga };
}