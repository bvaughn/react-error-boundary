import { Box, Callout, Code, Header } from "react-lib-tools";
import { html } from "../../public/generated/examples/UseErrorBoundary.json";

export default function UseErrorBoundaryRoute() {
  return (
    <Box direction="column" gap={4}>
      <Header section="API" title="useErrorBoundary hook" />
      <div>
        Convenience hook for imperatively showing or dismissing error
        boundaries.
      </div>
      <Code html={html} />
      <Callout intent="warning">
        This hook must only be used within an <code>ErrorBoundary</code>{" "}
        subtree.
      </Callout>
    </Box>
  );
}
