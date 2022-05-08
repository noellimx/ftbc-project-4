import uplinkGeneral from "./events/general";
import uplinkAuthentication from "./events/authentication";

import {
  Transition_DispatchUserOrder,
  OrderFlow,
  OrderSequence,
  UpLink,
  Coordinate,
  Outlet,SaveOrderAndCreateStackAndAddOrderToStack,
  MenuedOutlets,
  Menu,OrderTrigger,
  Location,
  Address,
  Transition_FindingStack,Collection
} from "./utils/my-types";
import { Store } from "@reduxjs/toolkit";
import { orderStatusInjector } from "./state/order";
import { Socket } from "socket.io-client";
import axios from "axios";

const orderEvents : (_:Socket, __:Store) => OrderTrigger = (io,store) => {
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

      console.log(`[transitToOrder_Stacking]`)
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


  const saveOrderAndCreateStackAndAddOrderToStack:SaveOrderAndCreateStackAndAddOrderToStack = async ({order, stackOptions}) => {

    console.log(`client.order.saveOrderAndCreateStackAndAddOrderToStack`)
    setTimeout(()=>{
      io.emit("request-add-order-to-new-stack",{order, stackOptions}, ({config, orders}:Collection) => {
        console.log(`request-add-order-to-new-stack `) 
        console.log(config)
        console.log(orders)
        const diff =config.stackingTil - new Date().getTime() ;
        console.log(diff)
        transitToOrder_Stacking()
      } )
    },
    1000
    )

  }
  return {
    transitToOrder_Ordering,
    transitToStackFinding_,saveOrderAndCreateStackAndAddOrderToStack
  };
};

const outletN_001: Outlet = {
  lat: 1.3199679250274892,
  lng: 103.84390692674646,
  postalCode: "307683",
  streetName: "Thomson Road",
  buildingNumber: 238,
  name: "Old Chang Kee @ Novena Square",
};

const outletN_002: Outlet = {
  lat: 1.317401884876873,
  lng: 103.84384177447781,
  postalCode: "307591",
  streetName: "Thomson Road",
  buildingNumber: 101,
  name: "Wee Name Kee",
};

const menu_outletN_001: Menu = [
  { description: "n001_food_1", price: 22 },
  { description: "n001_food_2", price: 2.2 },
];

const menu_outletN_002: Menu = [
  { description: "n002_food_1", price: 1.1 },
  { description: "n002_food_2", price: 1.2 },
];

type GetOutletWithMenus = () => MenuedOutlets;

let toggle = 0;
const getOutletsWithMenus: GetOutletWithMenus = () => {
  toggle = (toggle + 1) % 2;
  return toggle === 0 ? [] : [{ outlet: outletN_001, menu: menu_outletN_001 }];
};

interface OneMapApiResult {
  ADDRESS: string;
  BLK_NO: string;
  BUILDING: string;
  LATITUDE: string;
  LONGITUDE: string;
  POSTAL: string;
  ROAD_NAME: string;
  SEARCHVAL: string;
}

const apiResultToLocation = (result: OneMapApiResult) => {
  const { LATITUDE: _lat, LONGITUDE: _lng } = result;
  const [lat, lng] = [Number(_lat), Number(_lng)];
  const {
    BLK_NO: _buildingNumber,
    POSTAL: postalCode,
    ROAD_NAME: streetName,
  } = result;

  const buildingNumber = Number(_buildingNumber);
  const name = result.SEARCHVAL || result.ADDRESS || "";

  const coordinates: Coordinate = [lat, lng];
  const address: Address = {
    buildingNumber,
    streetName,
    postalCode,
    name,
  };

  return {
    coordinates,
    address,
  };
};

const locationEvents = (io: Socket, store: Store) => {
  const whichOutletsWithMenuNearHere = (
    coordinate: Coordinate,
    fn: (mO: MenuedOutlets) => void
  ) => {
    const recvData: MenuedOutlets = getOutletsWithMenus();
    console.log(
      `[whichOutletsWithMenuNearHere STUB] coordinate -> ${JSON.stringify(
        coordinate
      )}`
    );

    fn(recvData);
  };

  const searchBySearchVal: (_: string) => Promise<Location[]> = async (
    searchVal
  ) => {
    const result = await axios.get(
      `https://developers.onemap.sg/commonapi/search?searchVal=${searchVal}&returnGeom=Y&getAddrDetails=Y&pageNum=1`
    );

    const results = result.data.results;

    const locations: Location[] = results.map(apiResultToLocation);
    return locations.filter((location) => {
      const { address } = location;
      const { buildingNumber, streetName, postalCode } = address;

      return buildingNumber && streetName && postalCode;
    });
  };

  return { whichOutletsWithMenuNearHere, searchBySearchVal };
};

const newClient: UpLink = (io, store) => {
  const general = uplinkGeneral(io, store);
  const authentication = uplinkAuthentication(io, store);
  const order = orderEvents(io,store);
  const location = locationEvents(io, store);

  return {
    general,
    authentication,
    order,
    location,
  };
};

export default newClient;
