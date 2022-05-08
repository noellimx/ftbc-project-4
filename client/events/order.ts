import {
  Transition_DispatchUserOrder,
  OrderFlow,
  OrderSequence,
  SaveOrderAndCreateStackAndAddOrderToStack,
  OrderTrigger,
  Transition_FindingStack,
  Collection,
} from "../utils/my-types";
import { Store } from "@reduxjs/toolkit";
import { orderStatusInjector } from "../state/order";
import { Socket } from "socket.io-client";

const uplinkOrder: (_: Socket, __: Store) => OrderTrigger = (io, store) => {
  const transit = (_: OrderSequence) => {
    const injection = orderStatusInjector(_);
    store.dispatch(injection);
  };

  const transitToOrder_Ordering = () => {
    transit({
      kind: OrderFlow.DISPATCH_USER_ORDER,
      transition: Transition_DispatchUserOrder.ORDERING,
    });
  };

  const transitToOrder_Stacking = () => {
    console.log(`[transitToOrder_Stacking]`);
    transit({
      kind: OrderFlow.DISPATCH_USER_ORDER,
      transition: Transition_DispatchUserOrder.STACKING,
    });
  };

  const transitToStackFinding_ = () => {
    transit({
      kind: OrderFlow.FIND_STACK,
      transition: Transition_FindingStack.NOT_IMPLEMENTED,
    });
  };

  const saveOrderAndCreateStackAndAddOrderToStack: SaveOrderAndCreateStackAndAddOrderToStack =
    async ({ order, stackOptions }) => {
      console.log(`client.order.saveOrderAndCreateStackAndAddOrderToStack`);
      setTimeout(() => {
        io.emit(
          "request-add-order-to-new-stack",
          { order, stackOptions },
          ({ config, orders }: Collection) => {
            console.log(`request-add-order-to-new-stack `);
            console.log(config);
            console.log(orders);
            const diff = config.stackingTil - new Date().getTime();
            console.log(diff);
            transitToOrder_Stacking();
          }
        );
      }, 1000);
    };
  return {
    transitToOrder_Ordering,
    transitToStackFinding_,
    saveOrderAndCreateStackAndAddOrderToStack,
  };
};

export default uplinkOrder;
