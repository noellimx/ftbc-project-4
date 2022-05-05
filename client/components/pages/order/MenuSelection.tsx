import { ButtonGroup, Button } from "@mui/material";
import * as React from "react";

import {} from "../../../utils/my-types";

import { SelectableMenu, SelectableMenuItem } from "../../../utils/my-types";

interface SelectableMenuItemProps {
  mi: SelectableMenuItem;
  onClickInc: (_: number, __: SelectableMenuItem) => void;
  onClickDec: (_: number, __: SelectableMenuItem) => void;
}

const SelectableMenuItem: React.FC<SelectableMenuItemProps> = ({
  mi,
  onClickInc,
  onClickDec,
}) => {
  const { description, price, qty } = mi;

  return (
    <>
      {description} {price}
      <ButtonGroup>
        <Button
          disabled={qty <= 0}
          onClick={() => {
            onClickDec(1, mi);
          }}
        >
          -
        </Button>
        <Button>{qty}</Button>
        <Button
          onClick={() => {
            onClickInc(1, mi);
          }}
        >
          +
        </Button>
      </ButtonGroup>
    </>
  );
};

interface SelectableMenuProps {
  selectableMenu: SelectableMenu;
  onClickInc: (_: number, __: SelectableMenuItem) => void;
  onClickDec: (_: number, __: SelectableMenuItem) => void;
}

const MenuSelection: React.FC<SelectableMenuProps> = ({
  selectableMenu,
  onClickDec,
  onClickInc,
}) => {
  return (
    <>
      {selectableMenu &&
        selectableMenu.map((mi) => (
          <SelectableMenuItem
            key={`${mi.description}-${mi.price}`}
            mi={mi}
            onClickInc={onClickInc}
            onClickDec={onClickDec}
          />
        ))}
    </>
  );
};
export default MenuSelection;
