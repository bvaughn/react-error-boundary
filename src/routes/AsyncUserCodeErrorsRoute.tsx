import { Box, Code, Header, Link } from "react-lib-tools";
import { html } from "../../public/generated/examples/AsyncUserCodeErrors.json";

export default function AsyncUserCodeErrorsRoute() {
  return (
    <Box direction="column" gap={4}>
      <Header section="Examples" title="Async user code errors" />
      <div>
        React handles errors thrown during render, lifecycle methods, and
        constructors. Errors thrown in event handlers, or after async code has
        run, will not be caught by an error boundary automatically.
      </div>
      <div>
        For user-initiated async work, wrap the work in a Transition so React
        can catch errors from the Action and show the nearest error boundary.{" "}
        <Link to="/examples/transition-errors">Learn more</Link>.
      </div>
      <div>
        For async work outside of Actions, catch the error yourself and pass it
        to the nearest boundary with{" "}
        <Link to="/api/use-error-boundary-hook">useErrorBoundary</Link>:
      </div>
      <Code html={html} />
    </Box>
  );
}
