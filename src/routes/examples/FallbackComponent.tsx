import { ErrorBoundary, getErrorMessage, type FallbackProps } from "react-error-boundary";

function Fallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{getErrorMessage(error)}</pre>
      <button onClick={resetErrorBoundary}>Retry</button>
    </div>
  );
}

<ErrorBoundary
  FallbackComponent={Fallback}
  onReset={(details) => {
    // Reset the state of your app so the error doesn't happen again
    details; // hidden
  }}
>
  <YourApplication />
</ErrorBoundary>;

// <end>

function YourApplication() {
  return null;
}
