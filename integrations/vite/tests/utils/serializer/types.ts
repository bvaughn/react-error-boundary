import type {
  GroupProps,
  PanelProps,
  SeparatorProps,
} from "react-resizable-panels";
import type { ContainerProps } from "../../../src/components/Container";
import type { DisplayModeToggleProps } from "../../../src/components/DisplayModeToggle";
import type { PopupWindowProps } from "../../../src/components/PopupWindow";

type EncodedElementWithChildren<Props extends object = object> = Omit<
  Props,
  "children"
> & { children?: EncodedElement[] | undefined };

export interface EncodedContainerElement {
  props: EncodedElementWithChildren<ContainerProps>;
  type: "Container";
}

export interface EncodedDisplayModeToggleElement {
  props: EncodedElementWithChildren<DisplayModeToggleProps>;
  type: "DisplayModeToggle";
}

export interface EncodedGroupElement {
  props: EncodedElementWithChildren<GroupProps>;
  type: "Group";
}

export interface EncodedPanelElement {
  props: EncodedElementWithChildren<PanelProps>;
  type: "Panel";
}

export interface EncodedPopupWindowElement {
  props: EncodedElementWithChildren<PopupWindowProps>;
  type: "PopupWindow";
}

export interface EncodedSeparatorElement {
  props: SeparatorProps;
  type: "Separator";
}

export type TextProps = {
  children: string;
  className?: string | undefined;
};

export interface EncodedTextElement {
  props: TextProps;
  type: "Text";
}

export type EncodedElement =
  | EncodedContainerElement
  | EncodedDisplayModeToggleElement
  | EncodedGroupElement
  | EncodedPanelElement
  | EncodedPopupWindowElement
  | EncodedSeparatorElement
  | EncodedTextElement;
