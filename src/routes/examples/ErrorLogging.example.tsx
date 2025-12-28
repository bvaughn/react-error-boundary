"use client";

import type { ErrorInfo } from "react";
import { ErrorBoundary } from "react-error-boundary";

function logError(error: Error, info: ErrorInfo) {
  // Do something with the error, e.g. log to an external API
  error; // hidden
  info; // hidden
}

<ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
  <YourApplication />
</ErrorBoundary>;

// <end>

function ErrorFallback() {
  return null;
}

function YourApplication() {
  return null;
}
