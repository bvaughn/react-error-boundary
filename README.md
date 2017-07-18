# react-error-boundary

Sample reusable React error boundary component for React 16+

```jsx
import ErrorBoundary from 'react-error-boundary';

// The simplest way to use a boundary;
// Wrap around any component that may throw an error:
<ErrorBoundary>
  <ComponentThatMayError />
</ErrorBoundary>

// You can also react to errors (eg for logging):
const myErrorHandler = (error, componentStack) => {/* ... */}
<ErrorBoundary onError={myErrorHandler}>
  <ComponentThatMayError />
</ErrorBoundary>

// You can also customize the fallback appearance:
const MyFallbackComponent = ({ componentStack, error }) => (/* ... */)
<ErrorBoundary FallbackComponent={MyFallbackComponent}>
  <ComponentThatMayError />
</ErrorBoundary>
```