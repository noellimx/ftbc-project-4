/** React 18 */

import * as React from "react";

import { createRoot } from "react-dom/client";

import { App } from "./components/App";
import theme from "./components/theme";
import { ThemeProvider } from "@mui/material/styles";

const rootHTMLElement: HTMLElement = document.createElement("div");
document.body.appendChild(rootHTMLElement);

const rootReactComponent = (
  <>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </>
);

const PAINT = (htmlEle: HTMLElement, rEle: JSX.Element) => {
  createRoot(htmlEle).render(rEle);
};

PAINT(rootHTMLElement, rootReactComponent);
