import { CodeBlock } from "@/components/Code/CodeBlock";
import codeBlock1 from "@assets/code/fallbacks.error-boundary-with-fallback?raw";
import codeBlock2 from "@assets/code/fallbacks.error-boundary-with-fallback-component?raw";
import codeBlock3 from "@assets/code/fallbacks.error-boundary-reset?raw";

export function FallbacksRoute() {
  return (
    <>
      <p>
        The easiest way to use an error boundary is to render a generic fallback
        message:
      </p>
      <CodeBlock className="max-w-full" code={codeBlock1} />
      <p>You can also render something more specific though:</p>
      <CodeBlock className="max-w-full" code={codeBlock2} />
      <p>
        Certain types of errors may be recoverable, in which case your error
        boundary can also tell React to try re-rendering the component that
        threw before:
      </p>
      <CodeBlock className="max-w-full" code={codeBlock3} />
    </>
  );
}
