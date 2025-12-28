import { useContext, useMemo, useState } from "react";
import { assertErrorBoundaryContext } from "./assertErrorBoundaryContext";
import { ErrorBoundaryContext } from "./ErrorBoundaryContext";

type UseErrorBoundaryState =
  | { error: Error; hasError: true }
  | { error: null; hasError: false };

export type UseErrorBoundaryApi = {
  error: Error | null;
  resetBoundary: () => void;
  showBoundary: (error: Error) => void;
};

export function useErrorBoundary(): UseErrorBoundaryApi {
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
    [error, resetErrorBoundary]
  );

  if (state.hasError) {
    throw state.error;
  }

  return memoized;
}
