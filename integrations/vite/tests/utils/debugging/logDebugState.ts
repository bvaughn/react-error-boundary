import type { Page } from "@playwright/test";

export async function logDebugState(page: Page, prefix?: string) {
  const string = await page.evaluate(() =>
    Array.from(document.querySelectorAll("code"))
      .map((element) => element.outerHTML)
      .join("\n\n"),
  );

  console.log(prefix ? `${prefix}\n\n${string}` : string);
}
