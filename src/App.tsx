import { AppRoot, NavLink, NavSection } from "react-lib-tools";
import { routes } from "./routes";

export default function App() {
  return (
    <AppRoot
      navLinks={
        <div>
          <NavLink path="/">Getting started</NavLink>
          <NavSection label="Examples">
            <NavLink path="/examples/fallback">Fallback content</NavLink>
            <NavLink path="/examples/render-prop">Render prop</NavLink>
            <NavLink path="/examples/fallback-component">
              Fallback component
            </NavLink>
          </NavSection>
          <NavSection label="API">
            <NavLink path="/api/error-boundary-props">ErrorBoundary</NavLink>
            <NavLink path="/api/use-error-boundary-hook">
              useErrorBoundary
            </NavLink>
            <NavLink path="/api/with-error-boundary-hoc">
              withErrorBoundary
            </NavLink>
          </NavSection>
          <NavLink path="/support">Support</NavLink>
        </div>
      }
      packageDescription="runtime error handling"
      packageName="react-error-boundary"
      routes={routes}
    />
  );
}
