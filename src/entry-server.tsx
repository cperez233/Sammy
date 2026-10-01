/* editorial-ui · Cristian Pérez · cristianperez.me */
import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App";

/** Prerender: the full page goes into the HTML so crawlers and AI search read it without JS. */
export function render() {
  return renderToString(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
