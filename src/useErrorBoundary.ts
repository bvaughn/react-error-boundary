import { useContext, useMemo, useState } from "react";
import { assertErrorBoundaryContext } from "./assertErrorBoundaryContext";
import { ErrorBoundaryContext } from "./ErrorBoundaryContext";

type StateError<TError> =
  | (TError & { isShowBoundary: true })
  | (Error & { isShowBoundary: true });

type UseErrorBoundaryState<TError> =
  | { error: StateError<TError>; hasError: true }
  | { error: null; hasError: false };

export type UseErrorBoundaryApi<TError> = {
  resetBoundary: () => void;
  showBoundary: (error: TError) => void;
};

function normalize<TError>(error: TError): StateError<TError> {
  return typeof error === "object"
    ? Object.assign(Object.create(error as object), { isShowBoundary: true })
    : Object.assign(Error(error as string), { isShowBoundary: true });
}

export function useErrorBoundary<TError = any>(): UseErrorBoundaryApi<TError> {
  const context = useContext(ErrorBoundaryContext);

  assertErrorBoundaryContext(context);

  const [state, setState] = useState<UseErrorBoundaryState<TError>>({
    error: null,
    hasError: false,
  });

  const memoized = useMemo(
    () => ({
      resetBoundary: () => {
        context.resetErrorBoundary();
        setState({ error: null, hasError: false });
      },
      showBoundary: (error: TError) => {
        setState({
          error: normalize(error),
          hasError: true,
        });
      },
    }),
    [context.resetErrorBoundary]
  );

  if (state.hasError) {
    throw state.error;
  }

  return memoized;
}
