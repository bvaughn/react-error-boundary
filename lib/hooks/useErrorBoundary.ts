import { useContext, useMemo, useState } from "react";
import { ErrorBoundaryContext } from "../context/ErrorBoundaryContext";
import { assertErrorBoundaryContext } from "../utils/assertErrorBoundaryContext";

type UseErrorBoundaryState =
  | { error: Error; hasError: true }
  | { error: null; hasError: false };

export type UseErrorBoundaryApi = {
  error: Error | null;
  resetBoundary: () => void;
  showBoundary: (error: Error) => void;
};

/**
 * Convenience hook for imperatively showing or dismissing error boundaries.
 *
 * ⚠️ This hook must only be used within an `ErrorBoundary` subtree.
 */
export function useErrorBoundary(): {
  /**
   * The currently visible `Error` (if one has been thrown).
   */
  error: Error | null;

  /**
   * Method to reset and retry the nearest active error boundary (if one is active).
   */
  resetBoundary: () => void;

  /**
   * Trigger the nearest error boundary to display the error provided.
   *
   * ℹ️ React only handles errors thrown during render or during component lifecycle methods (e.g. effects and did-mount/did-update).
   * Errors thrown in event handlers, or after async code has run, will not be caught.
   * This method is a way to imperatively trigger an error boundary during these phases.
   */
  showBoundary: (error: Error) => void;
} {
  const context = useContext(ErrorBoundaryContext);

  assertErrorBoundaryContext(context);

  const { error, resetErrorBoundary } = context;

  const [state, setState] = useState<UseErrorBoundaryState>({
    error: null,
    hasError: false,
  });

  const memoized = useMemo(
    () => ({
      error,
      resetBoundary: () => {
        resetErrorBoundary();
        setState({ error: null, hasError: false });
      },
      showBoundary: (error: Error) =>
        setState({
          error,
          hasError: true,
        }),
    }),
    [error, resetErrorBoundary],
  );

  if (state.hasError) {
    throw state.error;
  }

  return memoized;
}
