import { createContext } from "react";

export type ErrorBoundaryContextType = {
  didCatch: boolean;
  error: any;
  resetErrorBoundary: (...args: any[]) => void;
  suppressLogging: boolean;
  handleSuppressLogging: (event: ErrorEvent) => void;
};

export const ErrorBoundaryContext =
  createContext<ErrorBoundaryContextType | null>(null);
