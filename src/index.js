import React from 'react'

const changedArray = (a = [], b = []) =>
  a.length !== b.length || a.some((item, index) => !Object.is(item, b[index]))

const initialState = {error: null, info: null}
class ErrorBoundary extends React.Component {
  static getDerivedStateFromError(error) {
    return {error}
  }

  state = initialState
  resetErrorBoundary = (...args) => {
    this.props.onReset?.(...args)
    this.setState(initialState)
  }

  componentDidCatch(error, info) {
    this.props.onError?.(error, info?.componentStack)
    this.setState({info})
  }

  componentDidUpdate(prevProps) {
    const {error, info} = this.state
    const {resetKeys} = this.props
    if (
      error !== null &&
      info !== null &&
      changedArray(prevProps.resetKeys, resetKeys)
    ) {
      this.props.onResetKeysChange?.(prevProps.resetKeys, resetKeys)
      this.setState(initialState)
    }
  }

  render() {
    const {error, info} = this.state
    const {fallbackRender, FallbackComponent, fallback} = this.props

    if (error !== null) {
      // we'll get a re-render with the error state in getDerivedStateFromError
      // but we don't have the info yet, so just render null
      // note that this won't be committed to the DOM thanks to our componentDidCatch
      // so the user won't see a flash of nothing, so this works fine.
      // the benefit of doing things this way rather than just putting both the
      // error and info setState within componentDidCatch is we avoid re-rendering
      // busted stuff: https://github.com/bvaughn/react-error-boundary/issues/66
      if (!info) return null

      const props = {
        componentStack: info?.componentStack,
        error,
        resetErrorBoundary: this.resetErrorBoundary,
      }
      if (React.isValidElement(fallback)) {
        return fallback
      } else if (typeof fallbackRender === 'function') {
        return fallbackRender(props)
      } else if (FallbackComponent) {
        return <FallbackComponent {...props} />
      } else {
        throw new Error(
          'react-error-boundary requires either a fallback, fallbackRender, or FallbackComponent prop',
        )
      }
    }

    return this.props.children
  }
}

function withErrorBoundary(Component, errorBoundaryProps) {
  function Wrapped(props) {
    return (
      <ErrorBoundary {...errorBoundaryProps}>
        <Component {...props} />
      </ErrorBoundary>
    )
  }

  // Format for display in DevTools
  const name = Component.displayName || Component.name || 'Unknown'
  Wrapped.displayName = `withErrorBoundary(${name})`

  return Wrapped
}

function useErrorHandler(givenError) {
  const [error, setError] = React.useState(null)
  if (givenError) throw givenError
  if (error) throw error
  return setError
}

export {ErrorBoundary, withErrorBoundary, useErrorHandler}
