import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Root } from "./Root.tsx";
import { assert } from "../lib/assert.ts";

import "./index.css";

const rootElement = document.getElementById("root");

assert(rootElement !== null);

createRoot(rootElement).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
