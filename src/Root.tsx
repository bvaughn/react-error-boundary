import { ExternalLink } from "@components/ExternalLink";
import { Icon } from "@components/Icon";
import { NavLink } from "@components/NavLink";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faTerminal } from "@fortawesome/free-solid-svg-icons";
import { HocRoute } from "@routes/HocRoute";
import { HomeRoute } from "@routes/HomeRoute";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { FallbacksRoute } from "./routes/FallbacksRoute";
import { Box } from "@components/Box";

export function Root() {
  return (
    <BrowserRouter>
      <div className="w-full max-w-240 mx-auto p-0 sm:p-4">
        <div className="overflow flex flex-col items-center flex flex-col gap-2">
          <div
            className="h-8 w-full overflow-auto flex flex-row items-center px-2 sm:px-3 whitespace-nowrap bg-slate-200 sm:rounded-full"
            role="navigation"
          >
            <Box className="text-md sm:text-sm" grow justifyContent="between">
              <Box>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/docs/fallbacks">Fallbacks</NavLink>
                <NavLink to="/docs/hooks">Hooks</NavLink>
                <NavLink to="/docs/hoc">HOCs</NavLink>
                <NavLink to="/docs/logging">Logging</NavLink>
              </Box>
              <Box>
                <ExternalLink href="https://github.com/bvaughn/react-error-boundary">
                  <Icon icon={faGithub} size="1x" />
                  <span className="ml-1 hidden md:inline">GitHub</span>
                </ExternalLink>
                <ExternalLink href="https://www.npmjs.com/package/react-error-boundary">
                  <Icon icon={faTerminal} size="1x" />
                  <span className="ml-1 hidden md:inline">NPM</span>
                </ExternalLink>
              </Box>
            </Box>
          </div>
          <main className="w-full flex flex-col gap-2 overflow-auto px-2 pb-2">
            <Routes>
              <Route path="/" element={<HomeRoute />} />
              <Route path="/docs/fallbacks" element={<FallbacksRoute />} />
              <Route path="/docs/hoc" element={<HocRoute />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
