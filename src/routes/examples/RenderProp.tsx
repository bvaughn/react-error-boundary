import { ErrorBoundary, getErrorMessage } from "react-error-boundary";

<ErrorBoundary
  fallbackRender={({ error, resetErrorBoundary }) => (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{getErrorMessage(error)}</pre>
      <button onClick={resetErrorBoundary}>Retry</button>
    </div>
  )}
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
