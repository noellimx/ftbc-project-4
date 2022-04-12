// import { createRoot } from 'react-dom/client';

// Create JSX element and log it.

// Create root element to render other elements into, add root element to DOM.

// Render the myEl JSX element into the root element with React.

// const rootHook = createRoot(rootHTMLElement)
// rootHook.render(<p>jo</p>)

/** React 17 */
import { render } from "react-dom";
import rootReactElement from "./non-initial-chunk.js";
const rootHTMLElement = document.createElement("div");
document.body.appendChild(rootHTMLElement);
render(rootReactElement, rootHTMLElement);

/** PREVIOUS */

// import io from "./connection/connection.js";
// import Scene from "./scene.js";
// import { revv } from "./components/elements/index.js";

// const scene = new Scene(io);
// scene.commence();
// revv();
