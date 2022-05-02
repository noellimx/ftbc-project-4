import { AnyAction } from "redux";

export interface PayloadAction<P> extends AnyAction {
  payload: P;
}

export interface TheState {
  ping: number;
}
