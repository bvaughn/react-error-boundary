import { useTransition } from "react";
import { ErrorBoundary } from "react-error-boundary";

function AddCommentContainer() {
  return (
    <ErrorBoundary fallback={<p>Could not add comment</p>}>
      <AddCommentButton />
    </ErrorBoundary>
  );
}

function AddCommentButton() {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      await addComment();
    });
  }

  return (
    <button disabled={isPending} onClick={handleClick}>
      {isPending ? "Adding..." : "Add comment"}
    </button>
  );
}

// <end>

export { AddCommentContainer };

async function addComment() {
  throw new Error("Unable to add comment");
}
