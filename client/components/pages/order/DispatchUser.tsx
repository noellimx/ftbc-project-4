import * as React from "react";

import DistrictSelector from "./DistrictSelector";
import SelectableMenuedOutlets from "./SelectableMenuedOutlets";
import MenuSelection from "./MenuSelection";
import { MapContainer, TileLayer, Popup, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { Stack } from "@mui/material";
import AsyncSelect from "react-select/async";

import * as L from "leaflet";

import SVGhomeFlag from "../../../static/icons/house-flag-solid-green.svg";
import SVGhomeFlagBlue from "../../../static/icons/house-flag-solid-blue.svg";

const outletIcon = L.icon({
  iconUrl: SVGhomeFlag,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

const endLocationIcon = L.icon({
  iconUrl: SVGhomeFlagBlue,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

import {
  DistrictSelectionOnChangeFn,
  SelectableMenu,
  SelectableMenuItem,
  TrulyImpure,
  Client,
  Coordinate,
  MenuedOutlets,
  MenuedOutlet,
  Outlet,
  Location,
} from "../../../utils/my-types";

import {
  Switch,
  Box,
  ButtonGroup,
  Button,
  TextField,
  Container,
} from "@mui/material";

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


interface BoundSetterProps {
  currentLocation: Coordinate;
  stackEndLocation: Coordinate;
  outletLocation: Coordinate;
}
const BoundSetter:React.FC<BoundSetterProps> = ({ outletLocation, currentLocation, stackEndLocation }) => {
  const map = useMap();

  const coords = [currentLocation, stackEndLocation, outletLocation]
    .filter((c) => !!c)
    .map((c) => L.marker(c));


  if (coords.length > 1){
map.fitBounds(L.featureGroup(coords).getBounds())
console.log(`zoom level ${map.getZoom()}`);
map.zoomOut(1)
console.log(`zoom level ${map.getZoom()}`);

  }else{
map.setView(coords[0].getLatLng(), 15);

  } 
  
  
  return <></>;
};

interface StackOptionsProps {
  stackWindow: number;
  stackEndLocation: Coordinate;
  stackRadius: number;
  onSwitchUp: TrulyImpure;
  onSwitchDown: TrulyImpure;
  incWindow: TrulyImpure;
  decWindow: TrulyImpure;
  updateEndLocation: (_: Coordinate) => void;
  client: Client;
  selectedMenuedOutlet: MenuedOutlet;
  currentLocation: Coordinate;
  outletLocation: Coordinate;
}



const StackOptions: React.FC<StackOptionsProps> = ({
  stackWindow,
  stackEndLocation,
  stackRadius,
  onSwitchUp = () => {},
  onSwitchDown = () => {},
  decWindow = () => {},
  incWindow = () => {},
  updateEndLocation,
  client,
  selectedMenuedOutlet,
  currentLocation,
  outletLocation,
}) => {
  const isWindow = stackWindow > 0;

  return (
    <>
      {/* <Box sx={{ color: isWindow ? "text.primary" : "black" }}>
        Stack Options
      </Box> */}
      {
        <Switch
          checked={isWindow}
          onClick={() => {
            if (isWindow) {
              onSwitchDown();
            } else {
              onSwitchUp();
            }
          }}
        />
      }{" "}
      {isWindow ? (
        <>
          <div>
            <ButtonGroup>
              <Button
                onClick={() => {
                  decWindow();
                }}
                disabled={stackWindow <= 1}
              >
                -
              </Button>{" "}
              <Button>{stackWindow}</Button>{" "}
              <Button
                onClick={() => {
                  incWindow();
                }}
              >
                +
              </Button>
            </ButtonGroup>{" "}
            mins
          </div>
          <EndLocation
            client={client}
            updateEndLocation={updateEndLocation}
          ></EndLocation>
          {stackEndLocation && (
            <MapContainer
              style={{ zIndex: 0, width: "100%", height: "200px" }}
              center={[
                selectedMenuedOutlet.outlet.lat,
                selectedMenuedOutlet.outlet.lng,
              ]}
              zoom={13}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='<img src="https://www.onemap.gov.sg/docs/maps/images/oneMap64-01.png" style="height:20px;width:20px;"/> OneMap | Map data &copy; contributors, <a href="http://SLA.gov.sg">Singapore Land Authority</a>'
                url="http://maps-c.onemap.sg/v3/Grey/{z}/{x}/{y}.png"
              />
              <Marker
                position={[
                  selectedMenuedOutlet.outlet.lat,
                  selectedMenuedOutlet.outlet.lng,
                ]}
                icon={outletIcon}
              ></Marker>
              <Marker
                position={stackEndLocation}
                icon={endLocationIcon}
              ></Marker>

              <BoundSetter
                stackEndLocation={stackEndLocation}
                currentLocation={currentLocation}
                outletLocation={outletLocation}
              />
            </MapContainer>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

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
const resetWindow: () => number = () => 0;
const resetEndLocation: () => Coordinate = () => null;
const resetRadius: () => number = () => 0;

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
  const [stackWindow, setStackWindow] = React.useState<number>(resetWindow());
  const [stackEndLocation, setEndLocation] = React.useState<Coordinate>(
    resetEndLocation()
  );
  const [stackRadius, setStackRadius] = React.useState<number>(resetRadius());

  React.useEffect(() => {
    console.log(`[effect] selectable menu is dependent on received menu`);
    const _selectableMenu = selectedMenuedOutlet
      ? selectedMenuedOutlet.menu.map((mi) => ({
          ...mi,
          qty: 0,
        }))
      : resetSltbMenu();
    setSelectableMenu(() => _selectableMenu);
  }, [selectedMenuedOutlet]);

  React.useEffect(() => {
    console.log(`[effect] selectable menu is dependent on received menu`);
    if (stackWindow === 0) {
      setEndLocation(() => resetEndLocation());
      setStackRadius(() => resetRadius());
    }
  }, [stackWindow]);

  const districtOnChangeFn: DistrictSelectionOnChangeFn = (event) => {
    const coordinate = stringToCoordinate(event.target.value);
    setSelectableMenuedOutlets(() => resetSltbMOs());
    setSelectedMenuedOutlet(() => resetSltMO());
    setStackWindow(() => resetWindow());

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
              <StackOptions
                stackWindow={stackWindow}
                stackEndLocation={stackEndLocation}
                stackRadius={stackRadius}
                onSwitchUp={() => setStackWindow(() => 1)}
                onSwitchDown={() => setStackWindow(() => 0)}
                incWindow={() => setStackWindow((prev) => prev + 1)}
                decWindow={() => setStackWindow((prev) => prev - 1)}
                updateEndLocation={(newC) => {
                  console.log(`new end location ${JSON.stringify(newC)}`);
                  setEndLocation(() => newC);
                }}
                client={client}
                selectedMenuedOutlet={selectedMenuedOutlet}
                currentLocation={[
                  selectedMenuedOutlet.outlet.lat,
                  selectedMenuedOutlet.outlet.lng,
                ]}
                outletLocation={[
                  selectedMenuedOutlet.outlet.lat,
                  selectedMenuedOutlet.outlet.lng,
                ]}
              ></StackOptions>
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
