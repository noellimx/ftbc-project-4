import * as React from "react";

import { TrulyImpure } from "../../utils/my-types";

import Button from "@mui/material/Button";

interface StdButtonProps {
  onClickFn: TrulyImpure;
  text: string;
}
const _StdButton: React.FC<StdButtonProps> = ({
  text,
  onClickFn = () => {},
}) => {
  return (
    <Button variant="outlined" disableElevation onClick={onClickFn}>
      {text}
    </Button>
  );
};

export default _StdButton;
