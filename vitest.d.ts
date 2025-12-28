import "vitest";

declare module "vitest" {
  interface Matchers {
    toLogError: (expectedError: string) => ReturnType;
  }
}
