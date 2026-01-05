import type { Page } from "@playwright/test";

export async function logGroup(page: Page) {
  console.log(
    await page.evaluate(
      () => document.querySelector("[data-group]")?.outerHTML,
    ),
  );
}
