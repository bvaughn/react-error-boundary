import { Box, Code, ExternalLink, Header } from "react-lib-tools";
import { html } from "../../public/generated/examples/GetErrorMessage.json";

export default function GetErrorMessageRoute() {
  return (
    <Box direction="column" gap={4}>
      <Header section="API" title="getErrorMessage helper" />
      <div>
        Typically <em>thrown</em> errors in JavaScript are instances of type{" "}
        <code>Error</code>, but{" "}
        <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw">
          this is not always the case
        </ExternalLink>
        . Any value can be thrown- strings, numbers, even <code>null</code> or{" "}
        <code>undefined</code>.
      </div>
      <div>
        To simplify working with thrown values, this library exports a utility
        method called <code>getErrorMessage</code>.
      </div>
      <Code html={html} />
    </Box>
  );
}
