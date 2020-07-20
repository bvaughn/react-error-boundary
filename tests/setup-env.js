import '@testing-library/jest-dom/extend-expect'

afterEach(() => {
  jest.resetAllMocks()
  jest.restoreAllMocks()
})

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => {
  try {
    expect(console.error).not.toHaveBeenCalled()
  } catch (e) {
    throw new Error(
      `console.error was called unexpectedly (make sure to assert all calls and console.error.mockClear() at the end of the test)`,
    )
  }
})

/*
eslint
  no-console: "off",
*/
