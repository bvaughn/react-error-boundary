import { useContext, useMemo, useState } from "react";
import { assertErrorBoundaryContext } from "./assertErrorBoundaryContext";
import { ErrorBoundaryContext } from "./ErrorBoundaryContext";

type StateError<TError> =
  | (TError & { _suppressLogging: boolean })
  | (Error & { _suppressLogging: boolean });

type UseErrorBoundaryState<TError> =
  | { error: StateError<TError>; hasError: true }
  | { error: null; hasError: false };

export type UseErrorBoundaryApi<TError> = {
  resetBoundary: () => void;
  showBoundary: (error: TError) => void;
};

export function useErrorBoundary<TError = any>(): UseErrorBoundaryApi<TError> {
  const context = useContext(ErrorBoundaryContext);

  assertErrorBoundaryContext(context);

  const suppressLoggingForError = function <TError>(
    error: TError
  ): StateError<TError> {
    const suppressLogging = {
      _suppressLogging: context.suppressLogging as boolean,
    };
    if (error != null) {
      switch (typeof error) {
        case "object": {
          if (Object.isExtensible(error)) {
            (error as StateError<TError>)._suppressLogging =
              context.suppressLogging;
            return error as StateError<TError>;
          } else {
            return Object.assign(
              Object.create(error as object),
              suppressLogging
            );
          }
        }
        default: {
          return Object.assign(Error(error as string), suppressLogging);
        }
      }
    } else {
      return Object.assign(Error(undefined), suppressLogging);
    }
  };

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
        if (context.suppressLogging) {
          window.addEventListener("error", context.handleSuppressLogging);
        }
        setState({
          error: suppressLoggingForError(error),
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
