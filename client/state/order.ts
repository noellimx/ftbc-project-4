import {
  PayloadAction,
  OrderSequence,
  OrderFlow,
  Transition_DispatchUserOrder,
  Transition_Nil,
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

const initSequenceStatus: () => OrderSequence = () => ({
  kind: OrderFlow.NIL,
  transition: Transition_Nil.NOT_IMPLEMENTED,
});

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
