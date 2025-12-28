import { Box, Code, Header } from "react-lib-tools";
import { html } from "../../public/generated/examples/FallbackComponent.json";

export default function FallbackComponentRoute() {
  return (
    <Box direction="column" gap={4}>
      <Header section="Examples" title="Fallback component" />
      <div>
        React component responsible for returning a fallback UI based on a
        thrown value.
      </div>
      <Code html={html} />
    </Box>
  );
}
