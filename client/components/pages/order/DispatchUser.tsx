import * as React from "react";

import Grid from "@mui/material/Grid";

import DistrictSelector from "./DistrictSelector";
import SelectableMenuedOutlets from "./SelectableMenuedOutlets";

import { DistrictSelectionOnChangeFn } from "../../../utils/my-types";


import { Client, Coordinate, Menu, Menus, MenuedOutlets,MenuedOutlet, Outlet,Outlets } from "../../../utils/my-types";

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




type InitMenus = () => Menus;
type InitMenu = () => Menu;
const initSelectableMenus: InitMenus = () => {
  return [];
};


const initSelectableMenu: InitMenu = () => {
  return [];
};




const outletsNovena: Outlets = [];
type StringToCoordinate = (_: string) => Coordinate;
const stringToCoordinate: StringToCoordinate = (latlng) => JSON.parse(latlng);




const DispatchUser: React.FC<DispatchUserProps> = ({ client }) => {
  const [state, setState] = React.useState(initState());
  const [outlet, useOutlet] = React.useState(initOutlet());
  const [selectableMenus, useSelectableMenus] = React.useState<Menus>(initSelectableMenus());


  const [selectableMenuedOutlets,setSelectableMenuedOutlets] = React.useState<MenuedOutlets>([]);
  const [selectedMenuedOutlet, setSelectedMenuedOutlet] = React.useState<MenuedOutlet>(null);
  const [selectableMenuItems, useSelectableMenuItems] = React.useState(
    initSelectableMenu()
  );


  const districtOnChangeFn:DistrictSelectionOnChangeFn = (event) => {
    const coordinate = stringToCoordinate(event.target.value);
    client.location.whichOutletsWithMenuNearHere(coordinate, (outletsWithMenu:MenuedOutlets) => {

      
    });
  };
  return (
    <>
      {state === DispatchSequence.STORE ? (
        <>
          <DistrictSelector onChangeFn={districtOnChangeFn}></DistrictSelector>
          <SelectableMenuedOutlets
            selectableMenuedOutlets={selectableMenuedOutlets}
          />
          <></>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default DispatchUser;
