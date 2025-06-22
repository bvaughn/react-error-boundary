import { defineConfig, defaultExclude } from "vitest/config";

export default defineConfig({
  test: {
    exclude: [...defaultExclude, "**/*.node.{test,spec}.?(c|m)[jt]s?(x)"],
    environment: "jsdom", // Use for browser-like tests
    coverage: {
      reporter: ["text", "json", "html"], // Optional: Add coverage reports
    },
  },
  resolve: {
    conditions: ["development", "browser"],
  },
});
