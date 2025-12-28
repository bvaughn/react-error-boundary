import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import {
  FontAwesomeIcon,
  type FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

export function Icon({
  className,
  icon,
  size,
}: {
  className?: string;
  icon: IconDefinition;
  size?: FontAwesomeIconProps["size"];
}) {
  return (
    <FontAwesomeIcon
      className={className}
      icon={icon as FontAwesomeIconProps["icon"]}
      size={size}
    />
  );
}
