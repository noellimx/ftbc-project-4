import uplinkGeneral from "./events/general";
import uplinkAuthentication from "./events/authentication";

import {
  Flow_FindStack,
  Flow_Order,
  OrderFlow,
  OrderSequence,
  UpLink,
  Coordinate,
} from "./utils/my-types";
import { Store } from "@reduxjs/toolkit";
import { orderStatusInjector } from "./state/order";
import { Socket } from "socket.io-client";

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


const locationEvents = (io:Socket, store:Store) => {

  const whatOutletsNearHere = (coordinate:Coordinate) => {
    
  }

  return {whatOutletsNearHere}
}


const newClient: UpLink = (io, store) => {
  const general = uplinkGeneral(io, store);
  const authentication = uplinkAuthentication(io, store);
  const order = orderEvents(store);
  const location = locationEvents(io,store);

  return {
    general,
    authentication,
    order,
    location,
  };
};

export default newClient;
