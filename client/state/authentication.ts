import { PayloadAction, AuthenticationStatus } from "../utils/my-types";

enum AuthenticationCommand {
  UPDATE = "auth:validity:update",
}

export type AuthenticationInjection = PayloadAction<AuthenticationStatus>;

type AuthenticationStatusInjector = (
  _: AuthenticationStatus
) => AuthenticationInjection;
type AuthenticationPipe = (
  _: AuthenticationStatus,
  __: AuthenticationInjection
) => AuthenticationStatus;

export const authenticationStatuInjector: AuthenticationStatusInjector = (
  status
) => ({
  type: AuthenticationCommand.UPDATE,
  payload: status,
});

export const authenticationStatusPipe: AuthenticationPipe = (
  status = AuthenticationStatus.UNCERTAIN,
  injection
) => {
  const { type, payload } = injection;
  if (type === AuthenticationCommand.UPDATE) {
    return payload;
  } else {
    return status;
  }
};
