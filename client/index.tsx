/** React 18 */

import * as React from "react";

import { createRoot } from "react-dom/client";

import { App } from "./components/App";

const rootHTMLElement: HTMLElement = document.createElement("div");
document.body.appendChild(rootHTMLElement);
createRoot(rootHTMLElement).render(<App />);
