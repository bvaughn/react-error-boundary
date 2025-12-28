import { Box, Code, ExternalLink, Header } from "react-lib-tools";
import { html } from "../../public/generated/examples/RenderProp.json";

export default function RenderPropRoute() {
  return (
    <Box direction="column" gap={4}>
      <Header section="Examples" title="Render props" />
      <div>
        <ExternalLink href="https://react.dev/reference/react/Children#calling-a-render-prop-to-customize-rendering">
          Render prop
        </ExternalLink>{" "}
        function responsible for returning a fallback UI based on a thrown
        value.
      </div>
      <Code html={html} />
    </Box>
  );
}
