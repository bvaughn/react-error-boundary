import type { Page } from "@playwright/test";
import { calculateHitArea } from "../calculateHitArea";
import { getCenterCoordinates } from "../getCenterCoordinates";

export async function resizeHelper(
  page: Page,
  panelIds: [string, string],
  deltaX: number = 0,
  deltaY: number = 0,
) {
  const hitAreaBox = await calculateHitArea(page, panelIds);

  const centerCoordinates = getCenterCoordinates(hitAreaBox);
  const destinationCoordinates = {
    x: centerCoordinates.x + deltaX,
    y: centerCoordinates.y + deltaY,
  };

  await page.mouse.move(centerCoordinates.x, centerCoordinates.y);
  await page.mouse.down();
  await page.mouse.move(destinationCoordinates.x, destinationCoordinates.y, {
    steps: 1,
  });
  await page.mouse.up();
}
