import * as React from "react";

import { MenuItem, Select } from "@mui/material";
import { FormControl, InputLabel } from "@mui/material";
import { Client } from "../../../utils/my-types";


type Location = {
  lat: number;
  lng: number;
};

interface DistrictLocation extends Location {
  alias: string;
}

type DistrictLocations = DistrictLocation[];

interface LocationSelectProps {
  client: Client
}
 

const dl1 = { lat: 1.29027 , lng: 103.851959, alias: "Center of Singapore" };
const dl2 = {
  lat: 1.3204021738781062,
  lng: 103.84353385476177,
  alias: "Novena",
};

const districtLocations = [dl1,dl2];

type Coordinate = [_:number,__:number]
type CoordinateToString = (_:Coordinate) => string;
type StringToCoordinate = (_: string) => Coordinate;



const coordinateToString: CoordinateToString = ([lat, lng]) => JSON.stringify([lat, lng]);
const stringToCoordinate: StringToCoordinate = (latlng) => JSON.parse(latlng);

const LocationSelector: React.FC<LocationSelectProps> = ({client}) => {
  return (
    <FormControl>
      <InputLabel id="demo-simple-select-label">Location</InputLabel>

      <Select
        onChange={(event, _) => {
          const coordinate = stringToCoordinate(event.target.value);
        }}
        defaultValue={""}
      >
        {districtLocations.map(({lat,lng,alias}) => {
            const value = coordinateToString([lat, lng]);
            return <MenuItem key={alias} value={value}>{alias}</MenuItem>;

        })}
      </Select>
    </FormControl>
  );
};
export default LocationSelector;
