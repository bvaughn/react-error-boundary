import type { Page } from "@playwright/test";

export async function getSeparatorAriaAttributes(page: Page, id?: string) {
  return page.evaluate(
    ([id]) => {
      const element = document.querySelector(
        id ? `[data-testid="${id}"]` : '[role="separator"]',
      );

      return {
        "aria-controls": element?.getAttribute("aria-controls"),
        "aria-valuemax": element?.getAttribute("aria-valuemax"),
        "aria-valuemin": element?.getAttribute("aria-valuemin"),
        "aria-valuenow": element?.getAttribute("aria-valuenow"),
      };
    },
    [id],
  );
}
