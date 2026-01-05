import { expect, type Page } from "@playwright/test";
import type { Layout } from "react-resizable-panels";

export async function expectLayout({
  layout,
  mainPage,
  onLayoutCount,
}: {
  layout: Layout;
  mainPage: Page;
  onLayoutCount: number;
}) {
  await expect(mainPage.getByText('"layout"')).toHaveText(
    JSON.stringify(
      {
        layout,
        onLayoutCount,
      },
      null,
      2,
    ),
  );
}
