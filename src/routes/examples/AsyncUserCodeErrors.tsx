import { useEffect } from "react"; // hidden
import { useErrorBoundary } from "react-error-boundary";

function useUserProfileInfo({ username }: { username: string }) {
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    fetchGreeting(username).then(
      (response) => {
        // Set data in state and re-render ...
        response; // hidden
      },
      (error) => {
        // Show error boundary
        showBoundary(error);
      }
    );
  });
}

// <end>

export { useUserProfileInfo };

async function fetchGreeting(_: string) {}
