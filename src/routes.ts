import { lazy, type ComponentType, type LazyExoticComponent } from "react";

export type Route = LazyExoticComponent<ComponentType<unknown>>;

export const routes = {
  "/examples/fallback": lazy(() => import("./routes/FallbackContentRoute")),
  "/examples/render-prop": lazy(() => import("./routes/RenderPropRoute")),
  "/examples/fallback-component": lazy(
    () => import("./routes/FallbackComponentRoute"),
  ),
  "/examples/error-logging": lazy(() => import("./routes/ErrorLoggingRoute")),
  "/examples/async-user-code-errors": lazy(
    () => import("./routes/AsyncUserCodeErrorsRoute"),
  ),
  "/examples/retry-nearest-boundary": lazy(
    () => import("./routes/ResetNearestBoundaryRoute"),
  ),
  "/api/error-boundary-props": lazy(
    () => import("./routes/ErrorBoundaryPropsRoute"),
  ),
  "/api/use-error-boundary-hook": lazy(
    () => import("./routes/UseErrorBoundaryRoute"),
  ),
  "/api/with-error-boundary-hoc": lazy(
    () => import("./routes/WithErrorBoundaryRoute"),
  ),
} satisfies Record<string, Route>;

export type Routes = Record<keyof typeof routes, Route>;
export type Path = keyof Routes;
