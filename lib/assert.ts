export function assert(
  value: unknown,
  message: string = "Assertion failed"
): asserts value {
  if (!value) {
    throw new Error(message);
  }
}
