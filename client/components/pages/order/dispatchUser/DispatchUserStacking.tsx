/// <reference path="../../../types/svg.d.ts" />

import * as React from "react";

import _StdButton from "../../../Buttons/_StdButton";

import "leaflet/dist/leaflet.css";

import { Client, TheState, Collection } from "../../../../utils/my-types";
import { useSelector } from "react-redux";

interface ThisComponentProps {
  client: Client;
}

const ThisComponent: React.FC<ThisComponentProps> = () => {
  const collection = useSelector<TheState, Collection>(
    (state) => state.collection
  );
  return collection ? (
    <>
      {" "}
      {collection.orders && collection.orders.length > 0 ? (
        <>You have some orders in the collection</>
      ) : (
        <>Collection found but is empty.</>
      )}
    </>
  ) : (
    <>Yikes. No collection found</>
  );
};

export default ThisComponent;
