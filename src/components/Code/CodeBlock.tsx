import { useEffect, useState } from "react";
import { codeToHtml, type BundledLanguage } from "shiki";
import { preprocess } from "./preprocess";

export function CodeBlock({
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
    <div className={`@container ${className}`}>
      <pre
        className="text-left text-wrap p-2 px-3 rounded-md bg-[#282A36] text-[#f6f6f4] text-xs block @lg:text-sm"
        dangerouslySetInnerHTML={{ __html: html ?? "" }}
      />
    </div>
  );
}
