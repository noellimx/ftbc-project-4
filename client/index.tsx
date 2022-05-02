/** Imports [Data] */

import { configureStore } from "@reduxjs/toolkit";

import io from "./connection/connection";
import uplinkGeneral from "./events/general";
import pipeSink from "./state/pipe-sink";

/** Imports [UI] */
import * as React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { App } from "./components/App";
import theme from "./components/theme";
import { Provider } from "react-redux";

/**
 * <----- Main ------>
 *
 * Initialize
 * 1) state
 * 2) state modifiers
 * 3) external data events handler
 */

// State Uplink To Server
const store = configureStore({
  reducer: pipeSink,
  preloadedState: { ping: 0 },
});

uplinkGeneral(io, store);

// UI Injection
const rootHTMLElement: HTMLElement = document.createElement("div");
document.body.appendChild(rootHTMLElement);

const rootReactComponent = (
  <>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </>
);

const PAINT = (htmlEle: HTMLElement, rEle: JSX.Element) => {
  createRoot(htmlEle).render(rEle);
};

PAINT(rootHTMLElement, rootReactComponent);
