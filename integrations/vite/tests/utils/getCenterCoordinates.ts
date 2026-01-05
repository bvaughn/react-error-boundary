import type { Box, Coordinates } from "./types";

export function getCenterCoordinates(box: Box): Coordinates {
  return {
    x: box.x + box.width / 2,
    y: box.y + box.height / 2,
  };
}
