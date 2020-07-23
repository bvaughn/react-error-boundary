import React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {ErrorBoundary, withErrorBoundary} from '..'

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

function Bomb() {
  throw new Error('💥 CABOOM 💥')
}

const firstLine = str => str.split('\n')[0]

test('standard use-case', async () => {
  function App() {
    const [username, setUsername] = React.useState('')
    function handleChange(e) {
      setUsername(e.target.value)
    }
    return (
      <div>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" onChange={handleChange} />
        </div>
        <div>{username === 'fail' ? 'Oh no' : 'things are good'}</div>
        <div>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            {username === 'fail' ? <Bomb /> : 'type "fail"'}
          </ErrorBoundary>
        </div>
      </div>
    )
  }

  render(<App />)

  await userEvent.type(screen.getByRole('textbox', {name: /username/i}), 'fail')

  const [[actualError], [componentStack]] = console.error.mock.calls
  expect(firstLine(actualError)).toMatchInlineSnapshot(
    `"Error: Uncaught [Error: 💥 CABOOM 💥]"`,
  )
  expect(componentStack).toMatchInlineSnapshot(`
    "The above error occurred in the <Bomb> component:
        in Bomb
        in ErrorBoundary
        in div
        in div
        in Unknown

    React will try to recreate this component tree from scratch using the error boundary you provided, ErrorBoundary."
  `)
  expect(console.error).toHaveBeenCalledTimes(2)
  console.error.mockClear()

  expect(screen.getByRole('alert')).toMatchInlineSnapshot(`
    <div
      role="alert"
    >
      <p>
        Something went wrong:
      </p>
      <pre>
        💥 CABOOM 💥
      </pre>
      <pre>
        
        in Bomb
        in ErrorBoundary
        in div
        in div
        in Unknown
      </pre>
      <button>
        Try again
      </button>
    </div>
  `)

  // can recover from errors when the component is rerendered and reset is clicked
  await userEvent.type(screen.getByRole('textbox', {name: /username/i}), '-not')
  userEvent.click(screen.getByRole('button', {name: /try again/i}))
  expect(screen.queryByRole('alert')).not.toBeInTheDocument()
})

test('fallbackRender prop', () => {
  const workingMessage = 'Phew, we are safe!'

  function App() {
    const [explode, setExplode] = React.useState(true)
    return (
      <div>
        <ErrorBoundary
          fallbackRender={({resetErrorBoundary}) => (
            <button
              onClick={() => {
                setExplode(false)
                resetErrorBoundary()
              }}
            >
              Try again
            </button>
          )}
        >
          {explode ? <Bomb /> : workingMessage}
        </ErrorBoundary>
      </div>
    )
  }

  render(<App />)
  expect(console.error).toHaveBeenCalledTimes(2)
  console.error.mockClear()

  // the render prop API allows a single action to reset the app state
  // as well as reset the ErrorBoundary state
  userEvent.click(screen.getByRole('button', {name: /try again/i}))
  expect(screen.getByText(workingMessage)).toBeInTheDocument()
})

test('simple fallback is supported', () => {
  render(
    <ErrorBoundary fallback={<div>Oh no</div>}>
      <Bomb />
      <span>child</span>
    </ErrorBoundary>,
  )
  expect(console.error).toHaveBeenCalledTimes(2)
  console.error.mockClear()
  expect(screen.getByText(/oh no/i)).toBeInTheDocument()
  expect(screen.queryByText(/child/i)).not.toBeInTheDocument()
})

test('withErrorBoundary HOC', () => {
  const onErrorHandler = jest.fn()
  const Boundary = withErrorBoundary(
    () => {
      throw new Error('💥 CABOOM 💥')
    },
    {FallbackComponent: ErrorFallback, onError: onErrorHandler},
  )
  render(<Boundary />)

  const [[actualError], [componentStack]] = console.error.mock.calls
  const firstLineOfError = firstLine(actualError)
  expect(firstLineOfError).toMatchInlineSnapshot(
    `"Error: Uncaught [Error: 💥 CABOOM 💥]"`,
  )
  expect(componentStack).toMatchInlineSnapshot(`
    "The above error occurred in one of your React components:
        in Unknown (created by withErrorBoundary(Unknown))
        in ErrorBoundary (created by withErrorBoundary(Unknown))
        in withErrorBoundary(Unknown)

    React will try to recreate this component tree from scratch using the error boundary you provided, ErrorBoundary."
  `)
  expect(console.error).toHaveBeenCalledTimes(2)
  console.error.mockClear()

  const [error, onErrorComponentStack] = onErrorHandler.mock.calls[0]
  expect(error.message).toMatchInlineSnapshot(`"💥 CABOOM 💥"`)
  expect(onErrorComponentStack).toMatchInlineSnapshot(`
    "
        in Unknown (created by withErrorBoundary(Unknown))
        in ErrorBoundary (created by withErrorBoundary(Unknown))
        in withErrorBoundary(Unknown)"
  `)
  expect(onErrorHandler).toHaveBeenCalledTimes(1)
})

test('supported but undocumented reset method', () => {
  const children = 'Boundry children'
  function App() {
    const errorBoundaryRef = React.useRef()
    const [explode, setExplode] = React.useState(false)
    return (
      <>
        <button onClick={() => setExplode(true)}>explode</button>
        <button
          onClick={() => {
            setExplode(false)
            errorBoundaryRef.current.resetErrorBoundary()
          }}
        >
          recover
        </button>
        <ErrorBoundary ref={errorBoundaryRef} FallbackComponent={ErrorFallback}>
          {explode ? <Bomb /> : children}
        </ErrorBoundary>
      </>
    )
  }
  render(<App />)
  userEvent.click(screen.getByText('explode'))

  expect(screen.queryByText(children)).not.toBeInTheDocument()
  expect(console.error).toHaveBeenCalledTimes(2)
  console.error.mockClear()

  userEvent.click(screen.getByText('recover'))
  expect(screen.getByText(children)).toBeInTheDocument()
  expect(console.error).toHaveBeenCalledTimes(0)
})

test('requires either a fallback, fallbackRender, or FallbackComponent', () => {
  expect(() =>
    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>,
    ),
  ).toThrowErrorMatchingInlineSnapshot(
    `"react-error-boundary requires either a fallback, fallbackRender, or FallbackComponent prop"`,
  )
  const [, , [actualError], [componentStack]] = console.error.mock.calls
  expect(firstLine(actualError)).toMatchInlineSnapshot(
    `"Error: Uncaught [Error: react-error-boundary requires either a fallback, fallbackRender, or FallbackComponent prop]"`,
  )
  expect(componentStack).toMatchInlineSnapshot(`
    "The above error occurred in the <ErrorBoundary> component:
        in ErrorBoundary

    Consider adding an error boundary to your tree to customize error handling behavior.
    Visit https://fb.me/react-error-boundaries to learn more about error boundaries."
  `)
  expect(console.error).toHaveBeenCalledTimes(4)
  console.error.mockClear()
})

// eslint-disable-next-line max-statements
test('supports automatic reset of error boundary when resetKeys change', () => {
  const handleReset = jest.fn()
  const TRY_AGAIN_ARG1 = 'TRY_AGAIN_ARG1'
  const TRY_AGAIN_ARG2 = 'TRY_AGAIN_ARG2'
  const handleResetKeysChange = jest.fn()
  function App() {
    const [explode, setExplode] = React.useState(false)
    const [extra, setExtra] = React.useState(false)
    return (
      <div>
        <button onClick={() => setExplode(e => !e)}>toggle explode</button>
        <ErrorBoundary
          fallbackRender={({resetErrorBoundary}) => (
            <div role="alert">
              <button
                onClick={() =>
                  resetErrorBoundary(TRY_AGAIN_ARG1, TRY_AGAIN_ARG2)
                }
              >
                Try again
              </button>
              <button onClick={() => setExtra(e => !e)}>
                toggle extra resetKey
              </button>
            </div>
          )}
          onReset={(...args) => {
            setExplode(false)
            handleReset(...args)
          }}
          onResetKeysChange={handleResetKeysChange}
          resetKeys={extra ? [explode, extra] : [explode]}
        >
          {explode || extra ? <Bomb /> : null}
        </ErrorBoundary>
      </div>
    )
  }
  render(<App />)

  // blow it up
  userEvent.click(screen.getByText('toggle explode'))
  expect(screen.getByRole('alert')).toBeInTheDocument()
  expect(console.error).toHaveBeenCalledTimes(2)
  console.error.mockClear()

  // recover via try again button
  userEvent.click(screen.getByText(/try again/i))
  expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  expect(console.error).not.toHaveBeenCalled()
  expect(handleReset).toHaveBeenCalledWith(TRY_AGAIN_ARG1, TRY_AGAIN_ARG2)
  expect(handleReset).toHaveBeenCalledTimes(1)
  handleReset.mockClear()
  expect(handleResetKeysChange).not.toHaveBeenCalled()

  // blow it up again
  userEvent.click(screen.getByText('toggle explode'))
  expect(screen.getByRole('alert')).toBeInTheDocument()
  expect(console.error).toHaveBeenCalledTimes(2)
  console.error.mockClear()

  // recover via resetKeys change
  userEvent.click(screen.getByText('toggle explode'))
  expect(handleResetKeysChange).toHaveBeenCalledWith([true], [false])
  expect(handleResetKeysChange).toHaveBeenCalledTimes(1)
  handleResetKeysChange.mockClear()
  expect(handleReset).not.toHaveBeenCalled()
  expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  expect(console.error).not.toHaveBeenCalled()

  // blow it up again
  userEvent.click(screen.getByText('toggle explode'))
  expect(screen.getByRole('alert')).toBeInTheDocument()
  expect(console.error).toHaveBeenCalledTimes(2)
  console.error.mockClear()

  // toggles adding an extra resetKey to the array
  // expect error to re-render
  userEvent.click(screen.getByText('toggle extra resetKey'))
  expect(handleResetKeysChange).toHaveBeenCalledTimes(1)
  expect(handleResetKeysChange).toHaveBeenCalledWith([true], [true, true])
  handleResetKeysChange.mockClear()
  expect(screen.getByRole('alert')).toBeInTheDocument()
  expect(console.error).toHaveBeenCalledTimes(2)
  console.error.mockClear()

  // toggle explode back to false
  // expect error to re-render again
  userEvent.click(screen.getByText('toggle explode'))
  expect(handleReset).not.toHaveBeenCalled()
  expect(handleResetKeysChange).toHaveBeenCalledTimes(1)
  expect(handleResetKeysChange).toHaveBeenCalledWith(
    [true, true],
    [false, true],
  )
  expect(screen.getByRole('alert')).toBeInTheDocument()
  handleResetKeysChange.mockClear()
  expect(console.error).toHaveBeenCalledTimes(2)
  console.error.mockClear()

  // toggle extra resetKey
  // expect error to be reset
  userEvent.click(screen.getByText('toggle extra resetKey'))
  expect(handleReset).not.toHaveBeenCalled()
  expect(handleResetKeysChange).toHaveBeenCalledTimes(1)
  expect(handleResetKeysChange).toHaveBeenCalledWith([false, true], [false])
  handleResetKeysChange.mockClear()
  expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  expect(console.error).not.toHaveBeenCalled()
})

test('should support not only function as FallbackComponent', () => {
  const container = document.createElement('div')
  document.body.appendChild(container)
  ;[React.forwardRef, React.memo, component => component].forEach(
    componentCreator => {
      const FancyFallback = componentCreator(({error}) => (
        <div>
          <p>Everything is broken. Try again</p>
          <pre>{error.message}</pre>
        </div>
      ))
      expect(() =>
        render(
          <ErrorBoundary FallbackComponent={FancyFallback}>
            <Bomb />
          </ErrorBoundary>,
          {
            container,
          },
        ),
      ).not.toThrow()

      expect(
        screen.getByText('Everything is broken. Try again'),
      ).toBeInTheDocument()
    },
  )

  console.error.mockClear()
})

test('should throw error if FallbackComponent is not valid', () => {
  expect(() =>
    render(
      <ErrorBoundary FallbackComponent={{}}>
        <Bomb />
      </ErrorBoundary>,
    ),
  ).toThrowError(/Element type is invalid/i)

  console.error.mockClear()
})
