import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomeRoute } from "./src/HomeRoute";
import { PageNotFoundRoute } from "./src/PageNotFoundRoute";

const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<PageNotFoundRoute />} />
        <Route path="/" element={<HomeRoute />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
