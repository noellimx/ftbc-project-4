/** React 18 */

import { createRoot } from "react-dom/client";

import App from "./react_components/App.jsx";
const rootHTMLElement = document.createElement("div");
document.body.appendChild(rootHTMLElement);
const rootHook = createRoot(rootHTMLElement);
rootHook.render(App);

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
