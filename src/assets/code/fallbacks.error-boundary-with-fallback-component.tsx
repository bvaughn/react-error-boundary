import type { FallbackProps } from "react-error-boundary";
// <hide>
import { ErrorBoundary } from "react-error-boundary";

const ComponentThatMightThrowAnError = () => null;
// </hide>

function Fallback({ error }: FallbackProps) {
  return <div role="alert">{error.message}</div>;
}

// prettier-ignore
<ErrorBoundary FallbackComponent={Fallback}>
  <ComponentThatMightThrowAnError />
</ErrorBoundary>
