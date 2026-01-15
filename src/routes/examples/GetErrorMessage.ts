import { getErrorMessage, type FallbackProps } from "react-error-boundary";

function Fallback({ error }: FallbackProps) {
  // Because 'error' can be anything, it's safest not to assume it's an Error
  // Use the getErrorMessage helper method to extract the message instead.
  const message = getErrorMessage(error) ?? "Unknown error";

  // Render fallback UI...
}

// <end>

export { Fallback };
