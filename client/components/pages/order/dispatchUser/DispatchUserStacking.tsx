/// <reference path="../../../types/svg.d.ts" />

import * as React from "react";

import _StdButton from "../../../Buttons/_StdButton";

import "leaflet/dist/leaflet.css";

import { Client, TheState, Collection } from "../../../../utils/my-types";
import { useSelector } from "react-redux";
import Countdown from "react-countdown";
interface ThisComponentProps {
  client: Client;
}

const ThisComponent: React.FC<ThisComponentProps> = () => {
  const collection = useSelector<TheState, Collection>(
    (state) => state.collection
  );

  return collection ? (
    <>
      {collection.orders && collection.orders.length > 0 ? (
        <>
          <>You have some orders in the collection</>
          <Countdown
            date={Date.now() + 5000}
            renderer={({ hours, minutes, seconds, completed }) => {
              if (completed) {
                // Render a completed state
                return <>gooh</>;
              } else {
                // Render a countdown
                return (
                  <span>
                    {hours}:{minutes}:{seconds}
                  </span>
                );
              }
            }}
          />
        </>
      ) : (
        <>Collection found but is empty.</>
      )}
    </>
  ) : (
    <>Yikes. No collection found</>
  );
};

export default ThisComponent;
