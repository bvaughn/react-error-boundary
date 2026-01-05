import type { Page } from "@playwright/test";
import { calculateBoxBetween } from "./calculateBoxBetween";

export async function calculateHitArea(page: Page, panelIds: [string, string]) {
  const panelA = page.getByText(`id: ${panelIds[0]}`);
  const panelB = page.getByText(`id: ${panelIds[1]}`);

  const panelBoxA = (await panelA.boundingBox())!;
  const panelBoxB = (await panelB.boundingBox())!;

  return calculateBoxBetween(panelBoxA, panelBoxB);
}
