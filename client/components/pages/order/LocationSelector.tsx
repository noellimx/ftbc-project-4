import * as React from "react";

import { MenuItem, Select } from "@mui/material";
import { FormControl, InputLabel } from "@mui/material";




type Location = {
  lat: number,
  lng: number,
}


interface DistrictLocation extends Location {
  alias: string
}

type DistrictLocations = DistrictLocation[];


interface LocationSelectProps {
}

const LocationSelector: React.FC<LocationSelectProps> = () => {
  return (
    <FormControl>
      <InputLabel id="demo-simple-select-label">Location</InputLabel>

      <Select
        onChange={(event, _) => {
          console.log(event.target.value);
        }}
        defaultValue={""}
      >
        <MenuItem value={1}>12</MenuItem>
        <MenuItem value={2}>23</MenuItem>
        <MenuItem value={3}>34</MenuItem>
      </Select>
    </FormControl>
  );
};
export default LocationSelector;
