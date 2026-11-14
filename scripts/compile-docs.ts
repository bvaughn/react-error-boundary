import { compileDocs } from "react-lib-tools/scripts/compile-docs.ts";

await compileDocs({
  componentNames: ["ErrorBoundary"],
  hookNames: ["useErrorBoundary"],
  imperativeHandleNames: [],
});
