import { CodeBlock } from "@/components/Code/CodeBlock";
import code from "@assets/code/hoc.example?raw";
import { ExternalLink } from "@components/ExternalLink";

export function HocRoute() {
  return (
    <>
      <p>
        You can wrap error boundaries around your components using the{" "}
        <code>withErrorBoundary</code> API. (This is what's sometimes referred
        to as a{" "}
        <ExternalLink href="https://legacy.reactjs.org/docs/higher-order-components.html">
          higher-order-component
        </ExternalLink>
        .)
      </p>
      <CodeBlock className="max-w-full" code={code} />
    </>
  );
}
