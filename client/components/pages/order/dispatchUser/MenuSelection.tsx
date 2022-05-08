import { ButtonGroup, Button } from "@mui/material";
import * as React from "react";

import { TrulyImpure } from "../../../../utils/my-types";

import { SelectableMenu, SelectableMenuItem } from "../../../../utils/my-types";

interface SelectableMenuItemProps {
  mi: SelectableMenuItem;
  onClickInc: (_: number, __: SelectableMenuItem) => void;
  onClickDec: (_: number, __: SelectableMenuItem) => void;
  isReadOnly: boolean;
}

const SelectableMenuItem: React.FC<SelectableMenuItemProps> = ({
  mi,
  isReadOnly,
  onClickInc,
  onClickDec,
}) => {
  const { description, price, qty } = mi;

  return (
    <>
      {description} {price}
      {isReadOnly ? (
        <>{qty}</>
      ) : (
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
      )}
    </>
  );
};

interface SelectableMenuProps {
  selectableMenu: SelectableMenu;
  onClickInc: (_: number, __: SelectableMenuItem) => void;
  onClickDec: (_: number, __: SelectableMenuItem) => void;
  isReadOnlyOrder: boolean;
  toggleReadOnly: TrulyImpure;
}

const MenuSelection: React.FC<SelectableMenuProps> = ({
  selectableMenu,
  onClickDec,
  onClickInc,
  isReadOnlyOrder,
  toggleReadOnly,
}) => {
  return (
    <>
      {selectableMenu &&
        selectableMenu.map((mi) => (
          <SelectableMenuItem
            isReadOnly={isReadOnlyOrder}
            key={`${mi.description}-${mi.price}`}
            mi={mi}
            onClickInc={onClickInc}
            onClickDec={onClickDec}
          />
        ))}
      <Button onClick={toggleReadOnly}>Lock Order</Button>
    </>
  );
};
export default MenuSelection;
