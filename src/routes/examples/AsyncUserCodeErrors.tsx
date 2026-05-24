import { useErrorBoundary } from "react-error-boundary";

function UserProfile({ username }: { username: string }) {
  const { showBoundary } = useErrorBoundary();

  async function loadProfile() {
    try {
      await fetchUserProfile(username);
    } catch (error) {
      showBoundary(error);
    }
  }

  return <button onClick={loadProfile}>Load profile</button>;
}

// <end>

export { UserProfile };

async function fetchUserProfile(_: string) {}
