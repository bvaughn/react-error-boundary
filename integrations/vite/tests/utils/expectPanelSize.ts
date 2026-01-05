import { expect, type Page } from "@playwright/test";
import type { PanelSize } from "react-resizable-panels";

export async function expectPanelSize({
  mainPage,
  onResizeCount,
  panelId,
  panelSize,
  prevPanelSize,
}: {
  mainPage: Page;
  onResizeCount: number;
  panelId: string | number;
  panelSize: PanelSize;
  prevPanelSize?: PanelSize | undefined;
}) {
  const locator = mainPage.getByText(`"panelId": "${panelId}"`);

  const text = JSON.stringify(
    {
      panelId,
      onResizeCount,
      panelSize,
      prevPanelSize,
    },
    null,
    2,
  );

  await expect(locator).toHaveText(text);
}
