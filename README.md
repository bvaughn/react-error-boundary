# react-error-boundary

Sample reusable React error boundary component for React 16+

The simplest way to use a boundary is to wrap it around any component that may throw an error.
This will handle errors thrown by that component's descendants also.

```jsx
import ErrorBoundary from 'react-error-boundary';

<ErrorBoundary>
  <ComponentThatMayError />
</ErrorBoundary>
```

You can react to errors (eg for logging) by providing an `onError` callback:

```jsx
import ErrorBoundary from 'react-error-boundary';

const myErrorHandler = (error: Error, componentStack: string) => {
  // ...
};

<ErrorBoundary onError={myErrorHandler}>
  <ComponentThatMayError />
</ErrorBoundary>
```

You can also customize the fallback appearance:

```jsx
const MyFallbackComponent = ({ componentStack, error }) => (
  <div/>
)

<ErrorBoundary FallbackComponent={MyFallbackComponent}>
  <ComponentThatMayError />
</ErrorBoundary>
```

You can also use it as a HOC:

```jsx
import {withErrorBoundary} from 'react-error-boundary';

const ComponentWithErrorBoundary = withErrorBoundary(
  ComponentToDecorate: Element<any>,
  CustomFallbackComponent: ?Element<any>,
  onErrorHandler: ?(error: Error, componentStack: string) => void,
);
```