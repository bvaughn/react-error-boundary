import type { Page } from "@playwright/test";
import type { ReactElement } from "react";
import type { GroupProps } from "react-resizable-panels";
import { encode } from "./serializer/encode";

export async function updateUrl(
  page: Page,
  element: ReactElement<GroupProps> | null,
) {
  const encodedString = element ? encode(element) : "";

  await page.evaluate(
    ([encodedString]) => {
      const url = new URL(window.location.href);
      url.searchParams.set("urlPanelGroup", encodedString ?? "");

      window.history.pushState(
        { urlPanelGroup: encodedString },
        "",
        url.toString(),
      );

      window.dispatchEvent(new Event("popstate"));
    },
    [encodedString],
  );
}
