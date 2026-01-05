import type { Page } from "@playwright/test";
import type { ReactElement } from "react";
import type { GroupProps } from "react-resizable-panels";
import { encode } from "./serializer/encode";

export async function goToUrlWithIframe(
  page: Page,
  element: ReactElement<GroupProps>,
  sameOrigin: boolean,
) {
  const encodedString = encode(element);

  const url = new URL("http://localhost:3012/e2e/decoder/iframe");
  url.searchParams.set("urlPanelGroup", encodedString);
  if (sameOrigin) {
    url.searchParams.set("sameOrigin", "");
  }

  // Uncomment when testing for easier repros
  // console.log(url.toString());

  await page.goto(url.toString());
}
