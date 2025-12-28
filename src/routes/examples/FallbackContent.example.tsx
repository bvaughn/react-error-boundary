"use client";

import { ErrorBoundary } from "react-error-boundary";

<ErrorBoundary fallback={<div>Something went wrong</div>}>
  <YourApplication />
</ErrorBoundary>;

// <end>

function YourApplication() {
  return null;
}
