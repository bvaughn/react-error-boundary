import type { PropsWithChildren } from "react";

type AlignItems = "center" | "end" | "start";
type Direction = "column" | "row";
type Gap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type JustifyContent =
  | "around"
  | "between"
  | "center"
  | "end"
  | "start"
  | "stretch";

export function Box({
  alignItems,
  children,
  className = "",
  direction = "row",
  fillHeight,
  fillWidth,
  gap = 2,
  grow = false,
  justifyContent,
  shrink = false,
  wrap,
}: PropsWithChildren<{
  alignItems?: AlignItems;
  className?: string;
  direction?: Direction;
  fillHeight?: boolean;
  fillWidth?: boolean;
  gap?: Gap;
  grow?: boolean;
  justifyContent?: JustifyContent;
  shrink?: boolean;
  wrap?: boolean;
}>) {
  const classNames = ["flex"];

  switch (direction) {
    case "column": {
      classNames.push("flex-col");
      break;
    }
    case "row": {
      classNames.push("flex-row");
      break;
    }
  }

  if (alignItems) {
    switch (alignItems) {
      case "center": {
        classNames.push("items-center");
        break;
      }
      case "end": {
        classNames.push("items-end");
        break;
      }
      case "start": {
        classNames.push("items-start");
        break;
      }
    }
  } else {
    if (direction === "row") {
      // Default vertical center align for rows
      classNames.push("items-center");
    }
  }

  if (justifyContent) {
    switch (justifyContent) {
      case "around": {
        classNames.push("justify-around");
        break;
      }
      case "between": {
        classNames.push("justify-between");
        break;
      }
      case "center": {
        classNames.push("justify-center");
        break;
      }
      case "end": {
        classNames.push("justify-end");
        break;
      }
      case "start": {
        classNames.push("justify-start");
        break;
      }
      case "stretch": {
        classNames.push("justify-stretch");
        break;
      }
    }
  }

  switch (gap) {
    case 1: {
      classNames.push("gap-1");
      break;
    }
    case 2: {
      classNames.push("gap-2");
      break;
    }
    case 3: {
      classNames.push("gap-3");
      break;
    }
    case 4: {
      classNames.push("gap-4");
      break;
    }
    case 5: {
      classNames.push("gap-5");
      break;
    }
    case 6: {
      classNames.push("gap-6");
      break;
    }
    case 7: {
      classNames.push("gap-7");
      break;
    }
    case 8: {
      classNames.push("gap-8");
      break;
    }
  }

  if (grow) {
    classNames.push("grow");
  }

  if (shrink) {
    classNames.push("shrink");
  }

  if (fillHeight) {
    classNames.push("h-full");
  }

  if (fillWidth) {
    classNames.push("w-full");
  }

  if (wrap) {
    classNames.push("flex-wrap");
  }

  if (className) {
    classNames.push(className);
  }

  return <div className={classNames.join(" ")}>{children}</div>;
}
