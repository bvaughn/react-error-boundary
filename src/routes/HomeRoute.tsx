import { CodeBlock } from "@/components/Code/CodeBlock";
import { CodeToken } from "@/components/Code/CodeToken";
import codeBlock2 from "@assets/code/home.error-boundary?raw";
import codeBlock1 from "@assets/code/home.try-catch?raw";
import { ExternalLink } from "@components/ExternalLink";
import { Link } from "react-router-dom";

export function HomeRoute() {
  return (
    <>
      <p>
        Error Boundaries in React are similar to <CodeToken code="try" />/
        <CodeToken code="catch" /> statements. They let you catch errors and
        show a fallback UI.
      </p>
      <p>In JavaScript you catch errors like this:</p>
      <CodeBlock className="max-w-full" code={codeBlock1} />
      <p>In a React application you catch them with an error boundary:</p>
      <CodeBlock className="max-w-full" code={codeBlock2} />
      <p>
        You can{" "}
        <ExternalLink href="https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary">
          create your own
        </ExternalLink>{" "}
        error boundaries in React or you can use a library like this to save
        time. <Link to="/docs/fallbacks">Keep reading</Link> to learn more.
      </p>
    </>
  );
}
