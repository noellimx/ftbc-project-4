import {
  PayloadAction,
  OrderSequence,
  OrderFlow,
  Flow_Order,
} from "../utils/my-types";

enum OrderSequenceCommand {
  UPDATE = "auth:validity:sequence:update",
}

export type OrderSequenceInjection = PayloadAction<OrderSequence>;

type OrderSequenceInjector = (_: OrderSequence) => OrderSequenceInjection;
export const orderStatusInjector: OrderSequenceInjector = (status) => ({
  type: OrderSequenceCommand.UPDATE,
  payload: status,
});

const initSequenceStatus = () => ({ flow: OrderFlow.NIL });

type OrderSequencePipe = (
  _: OrderSequence,
  __: OrderSequenceInjection
) => OrderSequence;

export const orderSequencePipe: OrderSequencePipe = (
  status = initSequenceStatus(),
  injection
) => {
  const { type, payload } = injection;
  if (type === OrderSequenceCommand.UPDATE) {
    return payload;
  } else {
    return status;
  }
};
