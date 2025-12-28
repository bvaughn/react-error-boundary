import { lazy, type ComponentType, type LazyExoticComponent } from "react";

export type Route = LazyExoticComponent<ComponentType<unknown>>;

export const routes = {
  "*": lazy(() => import("./routes/PageNotFound")),
  "/": lazy(() => import("./routes/GettingStartedRoute")),
  "/examples/fallback": lazy(() => import("./routes/FallbackContentRoute")),
  "/examples/render-prop": lazy(() => import("./routes/RenderPropRoute")),
  "/examples/fallback-component": lazy(
    () => import("./routes/FallbackComponentRoute")
  ),
  "/api/error-boundary-props": lazy(
    () => import("./routes/ErrorBoundaryPropsRoute")
  ),
  "/support": lazy(() => import("./routes/SupportRoute")),
} satisfies Record<string, Route>;

export type Routes = Record<keyof typeof routes, Route>;
export type Path = keyof Routes;
