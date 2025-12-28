import type { PropsWithChildren } from "react";

export function ExternalLink({
  children,
  className,
  href,
}: PropsWithChildren<{
  className?: string;
  href: string;
}>) {
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      referrerPolicy="no-referrer"
    >
      {children}
    </a>
  );
}
