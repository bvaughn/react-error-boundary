import { Box, Code, ExternalLink, Header } from "react-lib-tools";
import { html } from "../../public/generated/examples/TransitionErrors.json";
import { Link } from "../components/Link";

export default function TransitionErrorsRoute() {
  return (
    <Box direction="column" gap={4}>
      <Header section="Examples" title="Transition errors" />
      <div>
        React 19 catches errors thrown inside Actions and shows the fallback for
        the nearest error boundary. Actions include functions passed to{" "}
        <ExternalLink href="https://react.dev/reference/react/useTransition#displaying-an-error-to-users-with-an-error-boundary">
          startTransition
        </ExternalLink>
        .
      </div>
      <div>
        This is useful for user-initiated async work where an unexpected error
        should replace a section of the UI. For async work outside of Actions,
        catch the error yourself and pass it to the nearest boundary with{" "}
        <Link to="/examples/async-user-code-errors">useErrorBoundary</Link>.
      </div>
      <Code html={html} />
    </Box>
  );
}
