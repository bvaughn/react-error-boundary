import { useContext, useMemo, useState } from "react";
import { assertErrorBoundaryContext } from "./assertErrorBoundaryContext";
import { ErrorBoundaryContext } from "./ErrorBoundaryContext";

type UseErrorBoundaryState<TError> =
  | { error: TError; hasError: true }
  | { error: null; hasError: false };

export type UseErrorBoundaryApi<TError> = {
  resetBoundary: () => void;
  showBoundary: (error: TError) => void;
};

export function useErrorBoundary<TError extends Error>(): UseErrorBoundaryApi<TError> {
  const context = useContext(ErrorBoundaryContext);

  assertErrorBoundaryContext(context);

  const { resetErrorBoundary } = context;

  const [state, setState] = useState<UseErrorBoundaryState<TError>>({
    error: null,
    hasError: false,
  });

  const memoized = useMemo(
    () => ({
      resetBoundary: () => {
        resetErrorBoundary();
        setState({ error: null, hasError: false });
      },
      showBoundary: (error: TError) =>
        setState({
          error,
          hasError: true,
        }),
    }),
    [resetErrorBoundary]
  );

  if (state.hasError) {
    throw state.error;
  }

  return memoized;
}
