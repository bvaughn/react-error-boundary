export function assert(
  expectedCondition: unknown,
  message: string = "Assertion error"
): asserts expectedCondition {
  if (!expectedCondition) {
    throw Error(message);
  }
}
