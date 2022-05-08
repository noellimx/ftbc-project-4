import * as React from "react";

import _StdButton from "../../../Buttons/_StdButton";

import "leaflet/dist/leaflet.css";

import { Stack, Slider } from "@mui/material";
import AsyncSelect from "react-select/async";

import { Client, Coordinate, Location } from "../../../../utils/my-types";

import { Box } from "@mui/material";

interface EndLocationProps {
  updateEndLocation: (_: Coordinate) => void;
  client: Client;
}

const EndLocation: React.FC<EndLocationProps> = ({
  updateEndLocation,
  client,
}) => {
  return (
    <AsyncSelect
      styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
      cacheOptions
      formatOptionLabel={({ label, value }) => {
        return (
          <Stack sx={{ zIndex: "tooltip" }}>
            <Box>{value?.address?.name}</Box>
            <Box>{label}</Box>
          </Stack>
        );
      }}
      onChange={(option: { value: Location; label: string }) => {
        console.log(option);
        const { value: location } = option;
        updateEndLocation(location.coordinates);
      }}
      loadOptions={async (searchVal) => {
        const locations = await client.location.searchBySearchVal(searchVal);

        const options = locations.map((location) => {
          const { address } = location;
          const { buildingNumber, streetName, postalCode } = address;

          return {
            value: location,
            label: `${buildingNumber} ${streetName} ${postalCode}`,
          };
        });
        return options;
      }}
    />
  );
};

export default EndLocation;
