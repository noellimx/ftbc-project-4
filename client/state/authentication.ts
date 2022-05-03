import { PayloadAction, AuthenticationStatus } from "../utils/my-types";


enum AuthenticationCommand {
  UPDATE = "auth:validity:update",
}

export type AuthenticationInjection = PayloadAction<AuthenticationStatus>;

type AuthenticationInjector = (
  _: AuthenticationStatus
) => AuthenticationInjection;
type AuthenticationPipe = (
  _: AuthenticationStatus,
  __: AuthenticationInjection
) => AuthenticationStatus;

const authenticationInjector: AuthenticationInjector = (status) => ({
  type: AuthenticationCommand.UPDATE,
  payload: status,
});

export const authenticationStatusPipe: AuthenticationPipe = (
  status = AuthenticationStatus.UNCERTAIN,
  injection
) => {
  const { type, payload } = injection;
  console.log(`[pingPipe] status ?= ${status}`);
  console.log(`[pingPipe] injection ?= ${JSON.stringify(injection)}`);
  if (type === AuthenticationCommand.UPDATE) {
    return payload;
  } else {
    return status;
  }
};
