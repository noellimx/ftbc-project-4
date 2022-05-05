import { AnyAction } from "redux";
import { Socket } from "socket.io-client";
import { Store } from "redux";

export type TrulyImpure = () => void;

export interface PayloadAction<P> extends AnyAction {
  payload: P;
}

export const enum AuthenticationStatus {
  UNCERTAIN,
  FALSE,
  TRUE,
}

export interface TheState {
  ping: number;
  authenticationStatus: AuthenticationStatus;
  authenticationMessage: string;
}

export type ChannelReceive<T> = (data: T) => void;
export type EventTrigger = {};
export type UpLinkSub<T> = (_: Socket, __: Store) => T;

export interface SioResponse {
  code: string;
  data: any;
}

export type UserPassSubmitFn = (username: string, password: string) => void;

export interface AuthenticationTrigger extends EventTrigger {
  updateValidToken: TrulyImpure;
  presentToken: TrulyImpure;
  login: UserPassSubmitFn;
}

export interface OrderTrigger extends EventTrigger {
  transitToOrder: TrulyImpure;
  transitToStack: TrulyImpure;
}

export interface GeneralTrigger extends EventTrigger {
  acknowledge: TrulyImpure;
  doYouAcknowledge: (_: ChannelReceive<string>) => void;
}

export type SomeEventTrigger = AuthenticationTrigger | GeneralTrigger;
export interface Client {
  general: GeneralTrigger;
  authentication: AuthenticationTrigger;
  order: OrderTrigger;
}
export type UpLink = (_: Socket, __: Store) => Client;

export const enum OrderFlow {
  NIL,
  ORDER,
  FIND_STACK,
}

export const enum Flow_Order {
  ORDERING,
  PENDING_STACK,
  ORDERED,
}

export const enum Flow_FindStack {}

export interface OrderSequence {
  flow: OrderFlow;
  transition?: Flow_Order | Flow_FindStack;
}
