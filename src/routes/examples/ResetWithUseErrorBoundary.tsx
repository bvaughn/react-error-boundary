import { useErrorBoundary } from "react-error-boundary";

function Example() {
  const { resetBoundary } = useErrorBoundary();

  // Call resetBoundary() to reset the nearest ErrorBoundary and retry a failed render
  resetBoundary; // hidden
}

// <end>

export { Example };
