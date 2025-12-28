import { useEffect, useState } from "react";
import { codeToHtml, type BundledLanguage } from "shiki";
import { preprocess } from "./preprocess";

export function CodeToken({
  className,
  code,
  language = "tsx",
}: {
  className?: string;
  code: string;
  language?: BundledLanguage;
}) {
  const [html, setHTML] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const processed = preprocess(code);
      setHTML(
        await codeToHtml(processed, {
          lang: language,
          structure: "inline",
          theme: "dracula-soft",
        })
      );
    })();
  }, [code, language]);

  return (
    <code
      className={`text-sm text-[#f6f6f4] ${className}`}
      dangerouslySetInnerHTML={{ __html: html ?? "" }}
    />
  );
}
