import { useErrorBoundary } from "react-error-boundary";

function Example() {
  const {
    // The currently visible Error (if one has been thrown).
    error,

    // Method to reset and retry the nearest active error boundary (if one is active).
    resetBoundary,

    // Trigger the nearest error boundary to display the error provided.
    showBoundary,
   } = useErrorBoundary();

  // ...
  error; // hidden
  resetBoundary; // hidden
  showBoundary; // hidden
}

// <end>

export { Example };
