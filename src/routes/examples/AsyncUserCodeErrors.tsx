import { useEffect } from "react";
import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";

function UserProfileContainer({ username }: { username: string }) {
  return (
    <ErrorBoundary
      fallback={<p>Could not load profile</p>}
      resetKeys={[username]}
    >
      <UserProfile username={username} />
    </ErrorBoundary>
  );
}

function UserProfile({ username }: { username: string }) {
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    let cancelled = false;

    fetchUserProfile(username).then(
      (response) => {
        if (!cancelled) {
          // Set data in state and re-render
          response; // hidden
        }
      },
      (error) => {
        if (!cancelled) {
          showBoundary(error);
        }
      },
    );

    return () => {
      cancelled = true;
    };
  }, [showBoundary, username]);

  return null;
}

// <end>

export { UserProfileContainer };

async function fetchUserProfile(_: string) {}
