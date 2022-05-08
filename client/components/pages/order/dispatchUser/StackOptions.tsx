/// <reference path="../../../types/svg.d.ts" />

import * as React from "react";

import _StdButton from "../../../Buttons/_StdButton";

import EndLocation from "./EndLocation";
import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  useMap,
  Circle,
  Pane,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { Slider } from "@mui/material";

import {
  TrulyImpure,
  Client,
  Coordinate,
  MenuedOutlet,
} from "../../../../utils/my-types";

import { Switch, Box, ButtonGroup, Button } from "@mui/material";

import * as L from "leaflet";

import SVGhomeFlag from "../../../../static/icons/house-flag-solid-green.svg";
import SVGhomeFlagBlue from "../../../../static/icons/house-flag-solid-blue.svg";
import SVGUserSolid from "../../../../static/icons/user-solid.svg";

interface BoundSetterProps {
  currentLocation: Coordinate;
  stackEndLocation: Coordinate;
  outletLocation: Coordinate;
}
const BoundSetter: React.FC<BoundSetterProps> = ({
  outletLocation,
  currentLocation,
  stackEndLocation,
}) => {
  const map = useMap();

  React.useEffect(() => {
    console.log(`[Boundsetter useeffect`);
    const coords = [currentLocation, stackEndLocation, outletLocation]
      .filter((c) => !!c)
      .map((c) => L.marker(c));

    if (coords.length > 1) {
      map.fitBounds(L.featureGroup(coords).getBounds());
      console.log(`zoom level ${map.getZoom()}`);
    } else {
      map.setView(coords[0].getLatLng(), 15);
    }
  }, [
    currentLocation[0],
    currentLocation[1],
    stackEndLocation[0],
    stackEndLocation[1],
    outletLocation[0],
    outletLocation[1],
  ]);

  return <></>;
};

const outletIcon = L.icon({
  iconUrl: SVGhomeFlag,
  iconSize: [10, 10],
});

const endLocationIcon = L.icon({
  iconUrl: SVGhomeFlagBlue,
  iconSize: [10, 10],
});

const currentLocationIcon = L.icon({
  iconUrl: SVGUserSolid,
  iconSize: [10, 10],
});

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
  radiusChange: (_: number) => void;
  awaiting: boolean;
  saveOrderAndSubmitStackFn: TrulyImpure;
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
  radiusChange = (_) => {},
  awaiting,
  saveOrderAndSubmitStackFn,
}) => {
  console.log(`[FC StackOptions] `);
  console.log(`[awaiting] ${awaiting}`);
  const isWindow = stackWindow > 0;

  return awaiting === true ? (
    <></>
  ) : (
    <>
      {/* Stack Master Control */}
      {
        <Switch
          checked={isWindow}
          onClick={isWindow ? onSwitchDown : onSwitchUp}
        />
      }{" "}
      {/* Stack Settings */}
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
            <>
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
                {currentLocation && (
                  <Marker
                    position={currentLocation}
                    icon={currentLocationIcon}
                  ></Marker>
                )}

                <BoundSetter
                  stackEndLocation={stackEndLocation}
                  currentLocation={currentLocation}
                  outletLocation={outletLocation}
                />

                {stackRadius > 0 && (
                  <Pane name="cyan-rectangle">
                    <Circle center={stackEndLocation} radius={stackRadius} />
                  </Pane>
                )}
              </MapContainer>
              {stackRadius > 0 && (
                <>
                  <Slider
                    id="slider-radius-end-location"
                    value={stackRadius}
                    onChange={(evt, newValue) => {
                      evt.stopPropagation();
                      if (typeof newValue === "number") {
                        radiusChange(newValue);
                      }
                    }}
                    min={20}
                    max={200}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                  />
                  <div>{stackRadius}</div>
                </>
              )}

              {/* Stack Submission */}
              <_StdButton
                onClickFn={saveOrderAndSubmitStackFn}
                text={"Save Order and Create Stack"}
              />
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default StackOptions;
