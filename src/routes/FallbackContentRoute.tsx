import { Box, Code, Header } from "react-lib-tools";
import { html } from "../../public/generated/examples/FallbackContent.json";

export default function RenderPropRoute() {
  return (
    <Box direction="column" gap={4}>
      <Header section="Examples" title="Fallback content" />
      <div>The simplest way to render a default error message.</div>
      <Code html={html} />
    </Box>
  );
}
