import type { PropsWithChildren } from "react";
import { Link, useLocation } from "react-router-dom";

export function NavLink({
  children,
  to,
}: PropsWithChildren<{
  to: string;
}>) {
  const location = useLocation();
  const isCurrent = location.pathname === to;

  return (
    <Link
      className={`flex items-center ${isCurrent ? "text-blue-500" : ""} no-underline! hover:text-blue-500 hover:no-underline!`}
      to={to}
    >
      {children}
    </Link>
  );
}
