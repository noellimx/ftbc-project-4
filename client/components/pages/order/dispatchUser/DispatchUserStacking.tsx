/// <reference path="../../../types/svg.d.ts" />

import * as React from "react";

import _StdButton from "../../../Buttons/_StdButton";
import DistrictSelector from "./DistrictSelector";
import StackOptions from "./StackOptions";
import SelectableMenuedOutlets from "./SelectableMenuedOutlets";
import MenuSelection from "./MenuSelection";

import "leaflet/dist/leaflet.css";

import haversineOffset from "haversine-offset";

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
} from "../../../../utils/my-types";
import { useSelector } from "react-redux";



interface ThisComponentProps {
  client: Client
}

const ThisComponent:React.FC<ThisComponentProps> = () => {


  return <>Stacking</>
}


export default ThisComponent;