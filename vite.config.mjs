/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@routes": path.resolve(__dirname, "./src/routes"),
      "react-error-boundary": path.resolve(__dirname, "./lib/index"),
    },
  },
  test: {
    environment: "jsdom",
  },
});
