import type { Box } from "./types";

export function calculateBoxBetween(boxA: Box, boxB: Box): Box {
  if (boxA.y === boxB.y) {
    return {
      x: boxA.x + boxA.width,
      y: boxA.y,
      height: boxA.height,
      width: boxB.x - (boxA.x + boxA.width),
    };
  } else {
    return {
      x: boxA.x,
      y: boxA.y + boxA.height,
      height: boxB.y - (boxA.y + boxA.height),
      width: boxA.width,
    };
  }
}
