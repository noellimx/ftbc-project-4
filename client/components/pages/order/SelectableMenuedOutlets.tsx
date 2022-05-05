import * as React from "react";

import Grid from "@mui/material/Grid";

import { useSelector } from "react-redux";
import DistrictSelector from "./DistrictSelector";

import { DistrictSelectionOnChangeFn } from "../../../utils/my-types";

import {
  MenuedOutlets,
} from "../../../utils/my-types";

interface SelectableMenusProps {
  selectableMenuedOutlets: MenuedOutlets;
}

const SelectableMenuedOutlets: React.FC<SelectableMenusProps> = ({
  selectableMenuedOutlets,
}) => {
  return <></>;
};
export default SelectableMenuedOutlets;
