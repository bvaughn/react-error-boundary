import { compileDocs } from "react-lib-tools/scripts/compile-docs.ts";

// TODO Support hooks and HOCs?
// This could also be useful for react-resizable-panels

await compileDocs({
  componentNames: ["ErrorBoundary.tsx"],
  imperativeHandleNames: [],
});
