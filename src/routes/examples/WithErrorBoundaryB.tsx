import { UserProfile } from "./WithErrorBoundaryA";

// <begin>

import { withErrorBoundary } from "react-error-boundary";

const UserProfileWithErrorBoundary = withErrorBoundary(UserProfile, {
  fallback: <div>Something went wrong</div>,
  onError(error, info) {
    // Do something with the error
    // E.g. log to an error logging client here
    error; // hidden
    info; // hidden
  },
});

// <end>

export { UserProfileWithErrorBoundary };
