import { Box, Callout, ExternalLink, Header } from "react-lib-tools";

export default function GettingStartedRoute() {
  return (
    <Box direction="column" gap={4}>
      <Header title="Getting started" />
      <div>
        React components and utils for managing runtime errors. Supports all
        React renderers (including React DOM and React Native).
      </div>
      <Callout intent="primary">
        This package is built on top of React{" "}
        <ExternalLink href="https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary">
          error boundaries
        </ExternalLink>{" "}
        , so it has all of the advantages and limitations of that API.
      </Callout>
      <div className="text-xl mt-4">Installation</div>
      <div>Begin by installing the library from NPM:</div>
      <code className="grow text-xs md:text-sm block text-left whitespace-pre-wrap rounded-md p-3 bg-black text-white!">
        npm install <span className="tok-keyword">react-error-boundary</span>
      </code>
      <Callout intent="primary">
        TypeScript definitions are included within the published{" "}
        <code>dist</code> folder.
      </Callout>
      <div className="text-xl mt-4">Support</div>
      <div>Here are some ways to support this project:</div>
      <ul className="pl-8">
        <li className="list-disc">
          <ExternalLink href="https://github.com/sponsors/bvaughn/">
            Become a GitHub sponsor
          </ExternalLink>
        </li>
        <li className="list-disc">
          <ExternalLink href="http://givebrian.coffee/">
            Buy me a coffee
          </ExternalLink>
        </li>
      </ul>
    </Box>
  );
}
