import * as React from "react";

import { MenuItem, Select } from "@mui/material";
import { FormControl, InputLabel } from "@mui/material";
import {
  CoordinateToString,
  DistrictSelectionOnChangeFn,
  Coordinate,
} from "../../../utils/my-types";

type Location = {
  lat: number;
  lng: number;
};

interface DistrictLocation extends Location {
  alias: string;
}

type DistrictLocations = DistrictLocation[];

const dl1 = { lat: 1.29027, lng: 103.851959, alias: "Center of Singapore" };
const dl2 = {
  lat: 1.3204021738781062,
  lng: 103.84353385476177,
  alias: "Novena",
};

const districtLocations = [dl1, dl2];

const coordinateToString: CoordinateToString = ([lat, lng]) =>
  JSON.stringify([lat, lng]);

interface DistrictSelectorProps {
  onChangeFn: DistrictSelectionOnChangeFn;
  value: Coordinate;
}

const DistrictSelector: React.FC<DistrictSelectorProps> = ({
  onChangeFn = () => {},
  value,
}) => {
  return (
    <FormControl>
      <InputLabel id="demo-simple-select-label">Location</InputLabel>

      <Select
        onChange={onChangeFn}
        value={!!value ? coordinateToString(value) : ""}
      >
        {districtLocations.map(({ lat, lng, alias }) => {
          const value = coordinateToString([lat, lng]);
          return (
            <MenuItem key={alias} value={value}>
              {alias}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
export default DistrictSelector;
