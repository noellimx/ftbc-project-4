import { PayloadAction } from "../utils/my-types";

export type PingInjection = PayloadAction<number>;

type PingInjector = () => PingInjection;
type PingPipe = (_: number, __: PingInjection) => number;

enum PING {
  DEMO = "ping:echooooo",
}

const COMMAND = {
  PING,
};

const pingInjection: PingInjector = () => ({
  type: COMMAND.PING.DEMO,
  payload: 2,
});
export const pingReceived = () => {
  console.log(`[pingReceived]`);
  return pingInjection();
};
export const pingPipe: PingPipe = (count = 0, injection) => {
  const { type } = injection;
  console.log(`[pingPipe] count ?= ${count}`);
  console.log(`[pingPipe] injection ?= ${JSON.stringify(injection)}`);
  if (type === COMMAND.PING.DEMO) {
    return count + 1;
  } else {
    return count;
  }
};
