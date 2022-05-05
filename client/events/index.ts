import uplinkGeneral from "./general";
import uplinkAuthentication from "./authentication";

import {
  Flow_FindStack,
  Flow_Order,
  OrderFlow,
  OrderSequence,
  UpLink,
} from "../utils/my-types";
import { Store } from "@reduxjs/toolkit";
import { orderStatusInjector } from "../state/order";

const orderEvents = (store: Store) => {
  const transit = (_: OrderSequence) => {
    const injection = orderStatusInjector(_);
    store.dispatch(injection);
  };

  const transitToOrder = () => {
    transit({ flow: OrderFlow.ORDER, transition: Flow_Order.ORDERING });
  };

  const transitToStack = () => {
    transit({ flow: OrderFlow.FIND_STACK });
  };
  return {
    transitToOrder,
    transitToStack,
  };
};

const newClient: UpLink = (io, store) => {
  const general = uplinkGeneral(io, store);
  const authentication = uplinkAuthentication(io, store);
  const order = orderEvents(store);

  return {
    general,
    authentication,
    order,
  };
};

export default newClient;
