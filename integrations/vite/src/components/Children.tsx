import { useLayoutEffect, useState } from "react";

export type SizeProps = {
  height: number | undefined;
  width: number | undefined;
};

export const Children = function Children({
  height,
  onCommitLogsChange,
  width,
}: SizeProps & {
  onCommitLogsChange: (logs: SizeProps[]) => void;
}) {
  const [commitLogs, setCommitLogs] = useState<SizeProps[]>([]);

  useLayoutEffect(() => {
    setCommitLogs((prev) => [
      ...prev,
      {
        height:
          height === undefined ? undefined : parseFloat(height.toFixed(1)),
        width: width === undefined ? undefined : parseFloat(width.toFixed(1)),
      } as SizeProps,
    ]);
  }, [height, width]);

  useLayoutEffect(() => onCommitLogsChange(commitLogs));

  // Account for StrictMode double rendering on mount
  useLayoutEffect(
    () => () => {
      setCommitLogs([]);
    },
    [],
  );

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-1 text-white">
      {width} x {height} pixels
    </div>
  );
};
