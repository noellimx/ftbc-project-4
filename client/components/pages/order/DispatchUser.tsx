import * as React from "react";

import DistrictSelector from "./DistrictSelector";
import SelectableMenuedOutlets from "./SelectableMenuedOutlets";
import MenuSelection from "./MenuSelection";

import {
  DistrictSelectionOnChangeFn,
  SelectableMenu,
  SelectableMenuItem,
} from "../../../utils/my-types";

import {
  Client,
  Coordinate,
  MenuedOutlets,
  MenuedOutlet,
  Outlet,
} from "../../../utils/my-types";

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

type StringToCoordinate = (_: string) => Coordinate;
const stringToCoordinate: StringToCoordinate = (latlng) => JSON.parse(latlng);


const resetSltbMOs: () => MenuedOutlets = () => [];
const resetSltMO: () => MenuedOutlet = () => null;
const resetSltbMenu: () => SelectableMenu = () => [];

type BinaryOperation = (_: number, __: number) => number;

const DispatchUser: React.FC<DispatchUserProps> = ({ client }) => {
  const [state, setState] = React.useState(initState());

  const [selectableMenuedOutlets, setSelectableMenuedOutlets] =
    React.useState<MenuedOutlets>(resetSltbMOs());
  const [selectedMenuedOutlet, setSelectedMenuedOutlet] =
    React.useState<MenuedOutlet>(resetSltMO());
  const [selectableMenu, setSelectableMenu] = React.useState<SelectableMenu>(
    resetSltbMenu()
  );

  const districtOnChangeFn: DistrictSelectionOnChangeFn = (event) => {
    const coordinate = stringToCoordinate(event.target.value);
    setSelectableMenuedOutlets(() => resetSltbMOs());
    setSelectedMenuedOutlet(() => resetSltMO());

    client.location.whichOutletsWithMenuNearHere(
      coordinate,
      (outletsWithMenu: MenuedOutlets) => {
        setSelectableMenuedOutlets(() => outletsWithMenu);
      }
    );
  };

  const selectedOutletOnChangeFn = (mo: MenuedOutlet) => {
    setSelectedMenuedOutlet(() => mo);
  };

  React.useEffect(() => {
    console.log(`[effect] selectable menu is dependent on received menu`);
    const _selectableMenu = selectedMenuedOutlet?.menu.map((mi) => ({
      ...mi,
      qty: 0,
    }));
    setSelectableMenu(() => _selectableMenu);
  }, [selectedMenuedOutlet]);

  const add: BinaryOperation = (a: number, diff: number) => a + diff;
  const minus: BinaryOperation = (a: number, diff: number) => a - diff;

  const itemQtyChange = (
    qty: number,
    mi: SelectableMenuItem,
    opFn: BinaryOperation
  ) => {
    setSelectableMenu((list) => {
      return list.map((item) => {
        if (mi.description === item.description) {
          return {
            ...item,
            qty: opFn(item.qty, qty),
          };
        } else {
          return { ...item };
        }
      });
    });
  };
  const itemQtyIncFn = (qty: number, mi: SelectableMenuItem) => {
    itemQtyChange(qty, mi, add);
  };
  const itemQtyDecFn = (qty: number, mi: SelectableMenuItem) => {
    itemQtyChange(qty, mi, minus);
  };

  return (
    <>
      {state === DispatchSequence.STORE ? (
        <>
          <DistrictSelector onChangeFn={districtOnChangeFn}></DistrictSelector>
          {selectedMenuedOutlet === null ? (
            selectableMenuedOutlets ? (
              <SelectableMenuedOutlets
                selectableMenuedOutlets={selectableMenuedOutlets}
                onClick={selectedOutletOnChangeFn}
              />
            ) : (
              <>Choose a district! Neary outlets will be shown. </>
            )
          ) : (
            <>
              <SelectOutletDescription outlet={selectedMenuedOutlet.outlet} />
              <MenuSelection
                onClickInc={itemQtyIncFn}
                onClickDec={itemQtyDecFn}
                selectableMenu={selectableMenu}
              />
            </>
          )}
          <></>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default DispatchUser;
