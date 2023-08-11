export function assert(
  condition: unknown,
  messageOnError: string
): asserts condition {
  if (!condition) {
    throw new Error(messageOnError);
  }
}
