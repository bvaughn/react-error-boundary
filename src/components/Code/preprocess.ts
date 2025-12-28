export function preprocess(rawText: string) {
  const lines: string[] = [];

  let shouldHide = false;
  let wasPreviousLineEmpty = true;

  rawText.split("\n").forEach((line) => {
    if (shouldHide) {
      if (line.match(/<\/hide>/)) {
        shouldHide = false;
      }
      return;
    } else {
      if (line.match(/<hide>/)) {
        shouldHide = true;
        return;
      }
    }

    const isLineEmpty = line === "";
    if (wasPreviousLineEmpty && isLineEmpty) {
      return;
    }

    if (
      line.includes("@ts-expect-error") ||
      line.includes("// prettier-ignore")
    ) {
      return;
    }

    wasPreviousLineEmpty = isLineEmpty;

    lines.push(line);
  });

  return lines.join("\n");
}
