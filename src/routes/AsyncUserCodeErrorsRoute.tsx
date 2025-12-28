import { Box, Code, Header, Link } from "react-lib-tools";
import { html } from "../../public/generated/examples/AsyncUserCodeErrors.json";

export default function AsyncUserCodeErrorsRoute() {
  return (
    <Box direction="column" gap={4}>
      <Header section="Examples" title="Async user code errors" />
      <div>
        React only handles errors thrown during render or during component
        lifecycle methods (e.g. effects and did-mount/did-update). Errors thrown
        in event handlers, or after async code has run, will not be caught.
      </div>
      <div>
        The <Link to="/api/use-error-boundary-hook">useErrorBoundary</Link> hook
        can be used to pass those errors to the nearest error boundary:
      </div>
      <Code html={html} />
    </Box>
  );
}
