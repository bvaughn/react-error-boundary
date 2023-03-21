import { createContext } from "react";

export type ErrorBoundaryContextType = {
  didCatch: false;
  error: any;
  resetErrorBoundary: (...args: any[]) => void;
};

export const ErrorBoundaryContext =
  createContext<ErrorBoundaryContextType | null>(null);
