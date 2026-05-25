import { Box, Code, ExternalLink, Header } from "react-lib-tools";
import { html } from "../../public/generated/examples/TransitionErrors.json";
import { Link } from "../components/Link";

export default function TransitionErrorsRoute() {
  return (
    <Box direction="column" gap={4}>
      <Header section="Examples" title="Transition errors" />
      <div>
        React 19 catches errors thrown inside Actions and shows the fallback for
        the nearest error boundary. This includes functions passed to the{" "}
        <ExternalLink href="https://react.dev/reference/react/useTransition#displaying-an-error-to-users-with-an-error-boundary">
          startTransition
        </ExternalLink>{" "}
        function returned by <code>useTransition</code>.
      </div>
      <div>
        This is useful when an unexpected Action error should replace a section
        of the UI. It is an alternative to manually passing an error to the
        nearest boundary with{" "}
        <Link to="/examples/async-user-code-errors">useErrorBoundary</Link>.
      </div>
      <Code html={html} />
    </Box>
  );
}
