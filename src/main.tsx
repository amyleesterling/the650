import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "./styles/global.css";

/*
 * HashRouter keeps deep links working on GitHub Pages without any server-side
 * rewrite config — the whole site is a static, front-end-only SPA (v1 has no
 * backend by design).
 */
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
);
