/// <reference path="../../../types/svg.d.ts" />

import * as React from "react";

import _StdButton from "../../../Buttons/_StdButton";
// import DistrictSelector from "./DistrictSelector";
// import StackOptions from "./StackOptions";
// import SelectableMenuedOutlets from "./SelectableMenuedOutlets";
// import MenuSelection from "./MenuSelection";

import "leaflet/dist/leaflet.css";

import haversineOffset from "haversine-offset";
import {outletIcon,endLocationIcon,currentLocationIcon} from ".././Iconz"

import {
  DistrictSelectionOnChangeFn,
  SelectableMenu,
  SelectableMenuItem,
  Client,
  Coordinate,
  MenuedOutlets,
  MenuedOutlet,
  Outlet,
  TheState,
  Transition_DispatchUserOrder,
  OrderFlow,
  Transition_FindingStack,
} from "../../../../utils/my-types";
import { useSelector } from "react-redux";

import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";




interface SelectOutletDescriptionProps {
  outlet: Outlet;
}
const SelectOutletDescription: React.FC<SelectOutletDescriptionProps> = ({
  outlet,
}) => {
  return <>{outlet.name}</>;
};

interface DispatchUserProps {
  client: Client;
}

// local/serverless state
enum DispatchSequence {
  ORDERING,
  // server state
  STACKING,
  AWAITING_PRODUCTION,
  AWAITING_COLLECTION,
  DISPATCHING,
  COMPLETED,
}

const initState = () => DispatchSequence.ORDERING;

type StringToCoordinate = (_: string) => Coordinate;
const stringToCoordinate: StringToCoordinate = (latlng) => JSON.parse(latlng);

const resetSltbMOs: () => MenuedOutlets = () => [];
const resetSltMO: () => MenuedOutlet = () => null;
const resetSltbMenu: () => SelectableMenu = () => [];
const resetWindow: () => number = () => 0;
const resetMyLoc: () => Coordinate = () => [1.287953,103.851784];
const resetRadius: () => number = () => 0;
const resetCurrentLocation: () => Coordinate = () => {
  console.log(`[resetCurrentLocation]`);
  return null;
};

type BinaryOperation = (_: number, __: number) => number;



const resetReadOnly: () => boolean = () => false;
const ThisComponent: React.FC<DispatchUserProps> = ({ client }) => {
  console.log(`[FC Find Stack Setup]`);
  const state = useSelector<TheState, Transition_FindingStack>(
    (_state) => {
      const orderSequence = _state.orderSequence;
      if (orderSequence.kind === OrderFlow.FIND_STACK) {
        return orderSequence.transition;
      }
      throw new Error("[FC Find Stack] Should not mount here.");
    }
  );

    const [myLocation, setMyLocation ] = React.useState<Coordinate>(resetMyLoc)

  return <><>Where do you want to pick your food to</>
    <MapContainer
                 style={{ zIndex: 0, width: "100%", height: "200px" }}
                 center={myLocation}
                 zoom={13}
                 scrollWheelZoom={true}
                 >
                   <TileLayer
                  attribution='<img src="https://www.onemap.gov.sg/docs/maps/images/oneMap64-01.png" style="height:20px;width:20px;"/> OneMap | Map data &copy; contributors, <a href="http://SLA.gov.sg">Singapore Land Authority</a>'
                  url="http://maps-c.onemap.sg/v3/Grey/{z}/{x}/{y}.png"
                />


<Marker
      draggable={true}
      eventHandlers={{

        dragend(e) {


            console.log(e.target._latlng)
            console.log([e.target._latlng.lat,e.target._latlng.lng])
        }
      }}

      icon={currentLocationIcon}


      position={myLocation} >
      </Marker>
      
    </MapContainer>
  
  </>
};

export default ThisComponent;
