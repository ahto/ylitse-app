import * as E from 'fp-ts/lib/Either';
import * as RE from 'fp-ts-rxjs/lib/ObservableEither';

import * as accountApi from '../../api/account';
import * as mentorApi from '../../api/mentors';
import * as authApi from '../../api/auth';
import * as buddyApi from '../../api/buddies';
import * as messageApi from '../../api/messages';

type RegularActions = {
  'mentors/start': undefined;
  'mentors/end': Result<typeof mentorApi.fetchMentors>;

  'login/start': authApi.Credentials;
  'login/end': Result<typeof authApi.login>;

  'createUser/start': accountApi.NewUser;
  'createUser/end': Result<typeof accountApi.createUser>;

  'token/Acquired': authApi.AccessToken;
  'token/refresh/start': undefined;
  'token/refresh/end': Result<typeof authApi.refreshAccessToken>;

  'messages/start': undefined;
  'messages/end': Result<typeof messageApi.fetchMessages>;

  'buddies/end': Result<typeof buddyApi.fetchBuddies>;

  'sendMessage/start': messageApi.SendMessageParams;
  'sendMessage/end': {
    buddyId: string;
    response: Result<ReturnType<typeof messageApi.sendMessage>>;
  };
};

// TODO: handle curried case, Exists under the name "FinalReturn" in
// git history somewhere, use git log -S
type Result<F extends (...args: any[]) => any> = ReturnType<
  F
> extends RE.ObservableEither<infer E, infer A>
  ? E.Either<E, A>
  : never;

// https://github.com/microsoft/TypeScript/issues/23182
//type Payload<T> = [T] extends [never] ? {} : { payload: T };
export type ActionType = keyof RegularActions;
export type Action = {
  [Type in ActionType]: {
    type: Type;
    payload: RegularActions[Type];
  };
}[ActionType];

export function make<T extends ActionType, P extends RegularActions[T]>(
  type: T,
): (
  payload: P,
) => {
  type: T;
  payload: P;
} {
  return (payload: P) => ({ type, payload });
}
