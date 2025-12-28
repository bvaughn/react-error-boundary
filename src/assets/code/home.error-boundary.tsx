import { ErrorBoundary } from "react-error-boundary";

// <hide>
const ComponentThatMightThrowAnError = () => null;
const props = {} as any;
// </hide>

// prettier-ignore
<ErrorBoundary {...props}>
  <ComponentThatMightThrowAnError />
</ErrorBoundary>
