import { defineConfig, defaultExclude } from "vitest/config";

export default defineConfig({
  test: {
    exclude: [...defaultExclude, "**/*.trunk"],
    environment: "jsdom", // Use for browser-like tests
    coverage: {
      reporter: ["text", "json", "html"], // Optional: Add coverage reports
    },
  },
  resolve: {
    conditions: ["development", "browser"],
  },
});
