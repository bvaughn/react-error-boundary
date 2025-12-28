import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      // onConsoleLog(log, type) {
      //   console.log("[config] onConsoleLog:", type, log);
      //   switch (type) {
      //     case "stderr": {
      //       throw Error("Unexpected console error: " + log);
      //     }
      //   }
      // },
      environment: "jsdom",
      setupFiles: "./vitest.setup.js",
      exclude: ["node_modules"],
    },
  })
);
