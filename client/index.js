


/** React 18 */

import React from 'react';
import { createRoot } from 'react-dom/client';
const rootHTMLElement = document.createElement("div");
document.body.appendChild(rootHTMLElement);
const rootHook = createRoot(rootHTMLElement)
rootHook.render(<p>jo</p>)

/** React 17 */
// import ReactDOM from "react-dom";
// import rootReactElement from "./non-initial-chunk.js";
// const rootHTMLElement = document.createElement("div");
// document.body.appendChild(rootHTMLElement);
// ReactDOM.render(rootReactElement, rootHTMLElement);

/** PREVIOUS */

// import io from "./connection/connection.js";
// import Scene from "./scene.js";
// import { revv } from "./components/elements/index.js";

// const scene = new Scene(io);
// scene.commence();
// revv();
