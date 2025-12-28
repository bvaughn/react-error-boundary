"use client";

import { withErrorBoundary } from "react-error-boundary";

function YourComponent() {
  return <div />;
}

const YourComponentWithAnErrorBoundary = withErrorBoundary(YourComponent, {
  fallback: <div>Something went wrong</div>,
  onError(error, info) {
    // e.g. log error metrics
  },
});

// Your component can now be rendered (along with its error boundary) as
<YourComponentWithAnErrorBoundary />;
