// <hide>
import { ErrorBoundary } from "react-error-boundary";

const ComponentThatMightThrowAnError = () => null;
// </hide>

// prettier-ignore
<ErrorBoundary
  fallback={<div role="alert">Something went wrong</div>}
>
  <ComponentThatMightThrowAnError />
</ErrorBoundary>
