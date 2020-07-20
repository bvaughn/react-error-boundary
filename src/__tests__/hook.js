import React from 'react'
import userEvent from '@testing-library/user-event'
import {render, screen} from '@testing-library/react'
import {ErrorBoundary, useErrorHandler} from '..'

function ErrorFallback({error, componentStack, resetErrorBoundary}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <pre>{componentStack}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

const firstLine = str => str.split('\n')[0]

test('handleError forwards along async errors', async () => {
  function AsyncBomb() {
    const [explode, setExplode] = React.useState(false)
    const handleError = useErrorHandler()
    React.useEffect(() => {
      if (explode) {
        setTimeout(() => {
          handleError(new Error('💥 CABOOM 💥'))
        })
      }
    })
    return <button onClick={() => setExplode(true)}>bomb</button>
  }
  render(
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AsyncBomb />
    </ErrorBoundary>,
  )

  userEvent.click(screen.getByRole('button', {name: /bomb/i}))

  await screen.findByRole('alert')

  const [[actualError], [componentStack]] = console.error.mock.calls
  const firstLineOfError = firstLine(actualError)
  expect(firstLineOfError).toMatchInlineSnapshot(
    `"Error: Uncaught [Error: 💥 CABOOM 💥]"`,
  )
  expect(componentStack).toMatchInlineSnapshot(`
    "The above error occurred in one of your React components:
        in Unknown
        in ErrorBoundary

    React will try to recreate this component tree from scratch using the error boundary you provided, ErrorBoundary."
  `)
  expect(console.error).toHaveBeenCalledTimes(2)
  console.error.mockClear()

  // can recover
  userEvent.click(screen.getByRole('button', {name: /try again/i}))
  expect(console.error).not.toHaveBeenCalled()
})

test('can pass an error to useErrorHandler', async () => {
  function AsyncBomb() {
    const [error, setError] = React.useState(null)
    const [explode, setExplode] = React.useState(false)
    useErrorHandler(error)
    React.useEffect(() => {
      if (explode) {
        setTimeout(() => {
          setError(new Error('💥 CABOOM 💥'))
        })
      }
    })
    return <button onClick={() => setExplode(true)}>bomb</button>
  }
  render(
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AsyncBomb />
    </ErrorBoundary>,
  )

  userEvent.click(screen.getByRole('button', {name: /bomb/i}))

  await screen.findByRole('alert')
  const [[actualError], [componentStack]] = console.error.mock.calls
  const firstLineOfError = firstLine(actualError)
  expect(firstLineOfError).toMatchInlineSnapshot(
    `"Error: Uncaught [Error: 💥 CABOOM 💥]"`,
  )
  expect(componentStack).toMatchInlineSnapshot(`
    "The above error occurred in one of your React components:
        in Unknown
        in ErrorBoundary

    React will try to recreate this component tree from scratch using the error boundary you provided, ErrorBoundary."
  `)
  expect(console.error).toHaveBeenCalledTimes(2)
  console.error.mockClear()

  // can recover
  userEvent.click(screen.getByRole('button', {name: /try again/i}))
  expect(console.error).not.toHaveBeenCalled()
})
