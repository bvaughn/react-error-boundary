import { Box, Code, Header, Link } from "react-lib-tools";
import { html } from "../../public/generated/examples/AsyncUserCodeErrors.json";

export default function AsyncUserCodeErrorsRoute() {
  return (
    <Box direction="column" gap={4}>
      <Header section="Examples" title="Event handler and async errors" />
      <div>
        React handles errors thrown while rendering the tree below an error
        boundary. Errors thrown in event handlers, or after async code has run,
        will not be caught by an error boundary automatically.
      </div>
      <div>
        For async callback errors, like errors thrown after an Effect starts
        loading data, catch the error yourself and pass it to the nearest
        boundary with{" "}
        <Link to="/api/use-error-boundary-hook">useErrorBoundary</Link>. You can
        use the same pattern for event handler errors:
      </div>
      <div>
        In React 19, <code>useTransition</code> Actions can be an alternative:
        errors thrown from a function passed to the returned{" "}
        <code>startTransition</code> function are caught by the nearest
        boundary. <Link to="/examples/transition-errors">Learn more</Link>.
      </div>
      <Code html={html} />
    </Box>
  );
}
