/** Imports [Data] */

import { configureStore, Store } from "@reduxjs/toolkit";

import io from "./connection/connection";
import uplink from "./events";
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
const store: Store = configureStore({
  reducer: pipeSink,
  preloadedState: { ping: 0 },
});

const client = uplink(io, store);

client.general.doYouAcknowledge(console.log);

// UI Injection
const rootHTMLElement: HTMLElement = document.createElement("div");
document.body.appendChild(rootHTMLElement);

const rootReactComponent = (
  <>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App client={client} />
      </ThemeProvider>
    </Provider>
  </>
);

const PAINT = (htmlEle: HTMLElement, rEle: JSX.Element) => {
  createRoot(htmlEle).render(rEle);
};

PAINT(rootHTMLElement, rootReactComponent);
