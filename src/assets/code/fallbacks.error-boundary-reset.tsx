// <hide>
import { ErrorBoundary } from "react-error-boundary";
import type { FallbackProps } from "react-error-boundary";
// </hide>

function Fallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div>
      <div role="alert">{error.message}</div>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

// prettier-ignore
<ErrorBoundary FallbackComponent={Fallback} />
