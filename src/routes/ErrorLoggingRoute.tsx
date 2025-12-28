import { Box, Code, Header } from "react-lib-tools";
import { html } from "../../public/generated/examples/ErrorLogging.json";

export default function ErrorLoggingRoute() {
  return (
    <Box direction="column" gap={4}>
      <Header section="Examples" title="Error logging" />
      <div>
        Use the <code>onError</code> callback to log errors to a service like
        Sentry.
      </div>
      <Code html={html} />
    </Box>
  );
}
