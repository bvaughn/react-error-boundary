import { Box, Code, Header } from "react-lib-tools";
import { html } from "../../public/generated/examples/ResetWithUseErrorBoundary.json";
import { Link } from "../components/Link";

export default function ResetNearestBoundaryRoute() {
  return (
    <Box direction="column" gap={4}>
      <Header section="Examples" title="Reset nearest boundary" />
      <div>
        The <Link to="/api/use-error-boundary-hook">useErrorBoundary</Link> hook
        can be used to reset the nearest error boundary and retry a failed
        render attempt.
      </div>
      <Code html={html} />
    </Box>
  );
}
