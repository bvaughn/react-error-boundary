<div align="center">
<h1>react-error-boundary</h1>

<p>Simple reusable React error boundary component</p>
</div>

---

<!-- prettier-ignore-start -->
[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![version][version-badge]][package]
[![downloads][downloads-badge]][npmtrends]
[![MIT License][license-badge]][license]

[![PRs Welcome][prs-badge]][prs]
[![Code of Conduct][coc-badge]][coc]
<!-- prettier-ignore-end -->

## The problem

React [v16](https://reactjs.org/blog/2017/09/26/react-v16.0.html) introduced the
concept of [“error boundaries”](https://reactjs.org/docs/error-boundaries.html).

## This solution

This component provides a simple and reusable wrapper that you can use to wrap
around your components. Any rendering errors in your components hierarchy can
then be gracefully handled.

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Usage](#usage)
  - [Error Recovery](#error-recovery)
  - [fallback prop](#fallback-prop)
- [Issues](#issues)
  - [🐛 Bugs](#-bugs)
  - [💡 Feature Requests](#-feature-requests)
- [LICENSE](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and
should be installed as one of your project's `dependencies`:

```
npm install --save react-error-boundary
```

## Usage

The simplest way to use `<ErrorBoundary>` is to wrap it around any component
that may throw an error. This will handle errors thrown by that component and
its descendants too.

```jsx
import ErrorBoundary from 'react-error-boundary'

function ErrorFallback({error, componentStack}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <pre>{componentStack}</pre>
    </div>
  )
}

const ui = (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <ComponentThatMayError />
  </ErrorBoundary>,
)
```

You can react to errors (e.g. for logging) by providing an `onError` callback:

```jsx
import ErrorBoundary from 'react-error-boundary'

const myErrorHandler = (error: Error, componentStack: string) => {
  // Do something with the error
  // E.g. log to an error logging client here
}

const ui = (
  <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
    <ComponentThatMayError />
  </ErrorBoundary>,
)
```

You can also use it as a
[higher-order component](https://reactjs.org/docs/higher-order-components.html):

```jsx
import {withErrorBoundary} from 'react-error-boundary'

const ComponentWithErrorBoundary = withErrorBoundary(ComponentThatMayError, {
  FallbackComponent: ErrorBoundaryFallbackComponent,
  onError(error, componentStack) {
    // Do something with the error
    // E.g. log to an error logging client here
  },
})

const ui = <ComponentWithErrorBoundary />
```

### Error Recovery

Often you may want to recover from the error. You can do this using the
`resetErrorBoundary` prop:

```jsx
function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      <div>Oh no</div>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}
```

However, normally "trying again" like that will just result in the user
experiencing the same error. Typically some other state in your app will need to
be reset as well. The problem is, the `ErrorFallback` component won't usually
have access to the state that needs to be reset.

So alternatively, you can use the `fallbackRender` prop:

```jsx
const ui = (
  <ErrorBoundary
    fallbackRender={({error, resetErrorBoundary}) => (
      <div role="alert">
        <div>Oh no</div>
        <pre>{error.message}</pre>
        <button
          onClick={() => {
            resetComponentState() // <-- this is why the fallbackRender is useful
            resetErrorBoundary()
          }}
        >
          Try again
        </button>
      </div>
    )}
  >
    <ComponentThatMayError />
  </ErrorBoundary>
)
```

I know what you're thinking: I thought we ditched render props when hooks came
around. Unfortunately, the current React Error Boundary API only supports class
components at the moment, so render props are the best solution we have to this
problem.

### fallback prop

In the spirit of consistency with the `React.Suspense` component, we also
support a simple `fallback` prop which you can use for a generic fallback. This
will not be passed any props so you can't show the user anything actually useful
though, so it's not really recommended.

```jsx
const ui = (
  <ErrorBoundary fallback={<div>Oh no</div>}>
    <ComponentThatMayError />
  </ErrorBoundary>
)
```

## Issues

_Looking to contribute? Look for the [Good First Issue][good-first-issue]
label._

### 🐛 Bugs

Please file an issue for bugs, missing documentation, or unexpected behavior.

[**See Bugs**][bugs]

### 💡 Feature Requests

Please file an issue to suggest new features. Vote on feature requests by adding
a 👍. This helps maintainers prioritize what to work on.

[**See Feature Requests**][requests]

## LICENSE

MIT

<!-- prettier-ignore-start -->
[npm]: https://www.npmjs.com
[node]: https://nodejs.org
[build-badge]: https://img.shields.io/travis/org/bvaughn/react-error-boundary.svg?style=flat-square
[build]: https://travis-ci.org/bvaughn/react-error-boundary
[coverage-badge]: https://img.shields.io/codecov/c/github/bvaughn/react-error-boundary.svg?style=flat-square
[coverage]: https://codecov.io/github/bvaughn/react-error-boundary
[version-badge]: https://img.shields.io/npm/v/react-error-boundary.svg?style=flat-square
[package]: https://www.npmjs.com/package/react-error-boundary
[downloads-badge]: https://img.shields.io/npm/dm/react-error-boundary.svg?style=flat-square
[npmtrends]: http://www.npmtrends.com/react-error-boundary
[license-badge]: https://img.shields.io/npm/l/react-error-boundary.svg?style=flat-square
[license]: https://github.com/bvaughn/react-error-boundary/blob/master/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/bvaughn/react-error-boundary/blob/master/other/CODE_OF_CONDUCT.md
[bugs]: https://github.com/bvaughn/react-error-boundary/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+sort%3Acreated-desc+label%3Abug
[requests]: https://github.com/bvaughn/react-error-boundary/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc+label%3Aenhancement
[good-first-issue]: https://github.com/bvaughn/react-error-boundary/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc+label%3Aenhancement+label%3A%22good+first+issue%22
<!-- prettier-ignore-end -->
