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

export type Coordinate = [_: number, __: number];

export type Address = {
  postalCode: string;
  streetName: string;
  buildingNumber: number;
  name?: string;

};
export type Location = {
  coordinate: Coordinate;
  address: Address;
}

export interface LocationTrigger extends EventTrigger {
  whichOutletsWithMenuNearHere: (
    _: Coordinate,
    __: (_: MenuedOutlets) => void
  ) => void;

  searchBySearchVal: (_:string) => Promise<Location[]>
}
export type CoordinateToString = (_: Coordinate) => string;
export type SomeEventTrigger = AuthenticationTrigger | GeneralTrigger;
export interface Client {
  general: GeneralTrigger;
  authentication: AuthenticationTrigger;
  order: OrderTrigger;
  location: LocationTrigger;
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

export type MenuItem = {
  description: string;
  price: number;
};
export type Menu = MenuItem[];
export type Menus = Menu[];

export type Outlet = {
  lat: number;
  lng: number;
  postalCode: string;
  streetName: string;
  buildingNumber: number;
  name: string;
};

export type Outlets = Outlet[];

export type MenuedOutlet = {
  outlet: Outlet;
  menu: Menu;
};

export type MenuedOutlets = MenuedOutlet[];

export type DistrictSelectionOnChangeFn = (
  _: React.ChangeEvent<HTMLInputElement>
) => void;

export interface SelectableMenuItem extends MenuItem {
  qty: number;
}

export type SelectableMenu = SelectableMenuItem[];
