import { Box, Code, ExternalLink, Header } from "react-lib-tools";
import { html as htmlA } from "../../public/generated/examples/WithErrorBoundaryA.json";
import { html as htmlB } from "../../public/generated/examples/WithErrorBoundaryB.json";
import { html as htmlC } from "../../public/generated/examples/WithErrorBoundaryC.json";

export default function WithErrorBoundaryRoute() {
  return (
    <Box direction="column" gap={4}>
      <Header section="API" title="withErrorBoundary HOC" />
      <div>
        This package can also be used as a{" "}
        <ExternalLink href="https://legacy.reactjs.org/docs/higher-order-components.html">
          higher-order component
        </ExternalLink>
        . For example, given a component like this:
      </div>
      <Code html={htmlA} />
      <div>
        You could use the <code>withErrorBoundary</code> HOC to create a wrapper
        component:
      </div>
      <Code html={htmlB} />
      <div>And then render it like this</div>
      <Code html={htmlC} />
      <div>
        This might be useful for certain types of reusable/library components.
      </div>
    </Box>
  );
}
