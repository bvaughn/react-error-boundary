import {
  AppRoot,
  Callout,
  Code,
  ExternalLink,
  NavSection,
  type CommonQuestion,
} from "react-lib-tools";
import { html as htmlNpmResolution } from "../public/generated/examples/NpmResolution.json";
import { html as htmlYarnResolution } from "../public/generated/examples/YarnResolution.json";
import { Link } from "./components/Link";
import { NavLink } from "./components/NavLink";
import { routes } from "./routes";

export default function App() {
  return (
    <AppRoot
      commonQuestions={commonQuestions}
      navLinks={
        <div>
          <NavLink path="/">Getting started</NavLink>
          <NavSection label="Examples">
            <NavLink path="/examples/fallback">Fallback content</NavLink>
            <NavLink path="/examples/render-prop">Render prop</NavLink>
            <NavLink path="/examples/fallback-component">
              Fallback component
            </NavLink>
            <NavLink path="/examples/error-logging">Error logging</NavLink>
            <NavLink path="/examples/async-user-code-errors">
              Async user code errors
            </NavLink>
            <NavLink path="/examples/retry-nearest-boundary">
              Retry nearest boundary
            </NavLink>
          </NavSection>
          <NavSection label="API">
            <NavLink path="/api/error-boundary-props">ErrorBoundary</NavLink>
            <NavLink path="/api/use-error-boundary-hook">
              useErrorBoundary hook
            </NavLink>
            <NavLink path="/api/with-error-boundary-hoc">
              withErrorBoundary HOC
            </NavLink>
          </NavSection>
          <NavLink path="/common-questions">Common questions</NavLink>
          <NavLink path="/support">Support</NavLink>
        </div>
      }
      overview={
        <>
          <div>
            React components and utils for managing runtime errors. Supports all
            React renderers (including React DOM and React Native).
          </div>
          <Callout children={clientSideWarning} intent="warning" />
        </>
      }
      packageDescription="runtime error handling"
      packageName="react-error-boundary"
      routes={routes}
    />
  );
}

const clientSideWarning = (
  <div className="flex flex-col gap-2">
    <div>
      This package is built on top of React{" "}
      <ExternalLink href="https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary">
        error boundaries
      </ExternalLink>
      , so it has all of the advantages and constraints of that API.
    </div>
    <div>This means that it can't catch errors during:</div>
    <ul className="pl-8">
      <li className="list-disc">Server side rendering</li>
      <li className="list-disc">Event handlers</li>
      <li className="list-disc">Asynchronous code (including effects)</li>
    </ul>
    <div>
      You <em>can</em> show an error boundary for asynchronous code, but you
      have to catch the error yourself.{" "}
      <Link to="/examples/async-user-code-errors">Learn more</Link>.
    </div>
  </div>
);

const commonQuestions: CommonQuestion[] = [
  {
    id: "uncaught-error",
    question: "Why didn't the boundary catch my error?",
    answer: clientSideWarning,
  },
  {
    id: "react-types-mismatch",
    question: (
      <>
        What does this error mean: <code>ErrorBoundary</code> cannot be used as
        a JSX component
      </>
    ),
    answer: (
      <>
        <p>
          This error can be caused by a version mismatch between{" "}
          <code>react</code> and <code>@types/react</code>. To fix this, ensure
          that both match exactly.
        </p>
        <p>
          For NPM, you may need to use an{" "}
          <ExternalLink href="https://docs.npmjs.com/cli/v9/configuring-npm/package-json#overrides">
            override
          </ExternalLink>
          :
        </p>
        <Code html={htmlNpmResolution} />
        <p>
          Yarn has a similar mechanism called a{" "}
          <ExternalLink href="https://yarnpkg.com/cli/set/resolution">
            resolution
          </ExternalLink>
          :
        </p>
        <Code html={htmlYarnResolution} />
      </>
    ),
  },
];
