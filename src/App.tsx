import {
  AppRoot,
  Callout,
  Code,
  ExternalLink,
  type CommonQuestion,
  type DefaultPath,
  type NavConfig,
} from "react-lib-tools";
import { repository } from "../package.json";
import Logo from "../public/favicon.svg?react";
import { html as htmlNpmResolution } from "../public/generated/examples/NpmResolution.json";
import { html as htmlYarnResolution } from "../public/generated/examples/YarnResolution.json";
import { Link } from "./components/Link";
import { routes, type Path } from "./routes";

export default function App() {
  return (
    <AppRoot
      commonQuestions={commonQuestions}
      enableSiteSearch
      nav={nav}
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
      packageLogo={<Logo className="reb-logo w-8 h-8" />}
      packageName="react-error-boundary"
      repositoryUrl={repository.url}
      routes={routes}
    />
  );
}

const nav: NavConfig<Path | DefaultPath> = [
  { path: "/", title: "Getting started" },
  {
    title: "Examples",
    links: [
      { path: "/examples/fallback", title: "Fallback content" },
      { path: "/examples/render-prop", title: "Render prop" },
      { path: "/examples/fallback-component", title: "Fallback component" },
      { path: "/examples/error-logging", title: "Error logging" },
      {
        path: "/examples/async-user-code-errors",
        title: "Events & async methods",
      },
      { path: "/examples/transition-errors", title: "Transition errors" },
      {
        path: "/examples/retry-nearest-boundary",
        title: "Retry nearest boundary",
      },
    ],
  },
  {
    title: "API",
    links: [
      { path: "/api/error-boundary-props", title: "ErrorBoundary" },
      { path: "/api/use-error-boundary-hook", title: "useErrorBoundary hook" },
      { path: "/api/with-error-boundary-hoc", title: "withErrorBoundary HOC" },
      { path: "/api/get-error-message", title: "getErrorMessage helper" },
    ],
  },
  { path: "/common-questions", title: "Common questions" },
  { path: "/support", title: "Support" },
];

const clientSideWarning = (
  <div className="flex flex-col gap-2">
    <div>
      This package is built on top of React{" "}
      <ExternalLink href="https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary">
        error boundaries
      </ExternalLink>
      , so it follows React's rules for what errors are caught.
    </div>
    <div>
      Error boundaries catch errors thrown while rendering the tree below them.
    </div>
    <div>This means that it can't catch errors during:</div>
    <ul className="pl-8">
      <li className="list-disc">Server side rendering</li>
      <li className="list-disc">Event handlers</li>
      <li className="list-disc">Errors thrown in the error boundary itself</li>
      <li className="list-disc">
        Async code that runs after rendering, like setTimeout callbacks or
        unresolved promises
      </li>
    </ul>
    <div>For event handler errors and async callback errors:</div>
    <ul className="pl-8">
      <li className="list-disc">
        Use <code>useErrorBoundary</code> to pass caught errors to the nearest
        boundary. <Link to="/examples/async-user-code-errors">Learn more</Link>.
      </li>
      <li className="list-disc">
        In React 19, errors thrown from a function passed to the{" "}
        <code>startTransition</code> function returned by{" "}
        <code>useTransition</code> are caught by the nearest boundary.{" "}
        <Link to="/examples/transition-errors">Learn more</Link>.
      </li>
    </ul>
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
        <code>ErrorBoundary</code> cannot be used as a JSX component
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
  {
    id: "module-resolution-error",
    question: "Unable to resolve path to module 'react-error-boundary'",
    answer: (
      <>
        <div>
          The{" "}
          <ExternalLink href="https://github.com/bvaughn/react-error-boundary/releases/tag/6.0.0">
            version 6.0
          </ExternalLink>{" "}
          release of this library switched to ESM-only to better work with
          modern JavaScript tooling.
        </div>
        <div>
          If your project uses a framework or runtime that does not yet support
          ES Modules (like{" "}
          <ExternalLink href="https://github.com/expo/expo/issues/30323">
            Expo
          </ExternalLink>{" "}
          or{" "}
          <ExternalLink href="https://github.com/facebook/hermes/discussions/1391">
            Hermes
          </ExternalLink>
          ) then you should use version 5 of this library. There are no major
          API differences between these two versions other than ESM support.
        </div>
      </>
    ),
  },
];
