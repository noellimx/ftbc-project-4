import * as React from "react";

import Grid from "@mui/material/Grid";
import { Client, Coordinate } from "../../../utils/my-types";

import { useSelector } from "react-redux";
import DistrictSelector, { LocationSelectionOnChangeFn } from "./DistrictSelector";

interface DispatchUserProps {
  client: Client;
}

enum DispatchSequence {
  // local/serverless state
  STORE,
  ORDER,
  // server state
  STACKING,
  COLLECT,
  DISPATCHING,
  COMPLETED,
}

const initState = () => DispatchSequence.STORE;
const initOutlet = () => "";

type MenuItem = {
  description: string;
  price: number;
  qty: 0;
};

type Menu = MenuItem[];

type InitMenu = () => Menu;
const initMenu: InitMenu = () => {
  return [];
};

type Outlet = {
  lat: number;
  lng: number;
  postalCode: string;
  streetName: string;
  buildingNumber: number;
  name: string;
};

export type Outlets = Outlet[];

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

const outletsNovena: Outlets = [];
type StringToCoordinate = (_: string) => Coordinate;
const stringToCoordinate: StringToCoordinate = (latlng) => JSON.parse(latlng);

const DispatchUser: React.FC<DispatchUserProps> = ({ client }) => {
  const [state, setState] = React.useState(initState());
  const [outlet, useOutlet] = React.useState(initOutlet());
  const [menu, useMenu] = React.useState(initMenu());


  const districtOnChangeFn:LocationSelectionOnChangeFn = (event) => {
    const coordinate = stringToCoordinate(event.target.value);

    client.location.whatOutletsNearHere(coordinate);
  };
  return (
    <>
      {state === DispatchSequence.STORE ? (
        <DistrictSelector onChangeFn={districtOnChangeFn}></DistrictSelector>
      ) : (
        <></>
      )}
    </>
  );
};

export default DispatchUser;
