import { type PropsWithChildren, type ReactElement } from "react";
import {
  Group,
  Panel,
  Separator,
  type GroupProps,
  type PanelProps,
  type SeparatorProps,
} from "react-resizable-panels";
import {
  Container,
  type ContainerProps,
} from "../../../src/components/Container";
import {
  DisplayModeToggle,
  type DisplayModeToggleProps,
} from "../../../src/components/DisplayModeToggle";
import {
  PopupWindow,
  type PopupWindowProps,
} from "../../../src/components/PopupWindow";
import type {
  EncodedContainerElement,
  EncodedDisplayModeToggleElement,
  EncodedElement,
  EncodedGroupElement,
  EncodedPanelElement,
  EncodedPopupWindowElement,
  EncodedSeparatorElement,
  EncodedTextElement,
  TextProps,
} from "./types";

export function encode(element: ReactElement<unknown>) {
  const json = encodeChildren([element]);
  const stringified = JSON.stringify(json);

  return encodeURIComponent(stringified);
}

function encodeChildren(children: ReactElement<unknown>[]): EncodedElement[] {
  const elements: EncodedElement[] = [];

  children.forEach((current) => {
    if (!current) {
      return;
    }

    switch (current.type) {
      case Container: {
        elements.push(encodeContainer(current as ReactElement<ContainerProps>));
        break;
      }
      case DisplayModeToggle: {
        elements.push(
          encodeDisplayModeToggle(
            current as ReactElement<DisplayModeToggleProps>,
          ),
        );
        break;
      }
      case Group: {
        elements.push(encodeGroup(current as ReactElement<GroupProps>));
        break;
      }
      case Panel: {
        elements.push(encodePanel(current as ReactElement<PanelProps>));
        break;
      }
      case PopupWindow: {
        elements.push(
          encodePopupWindow(current as ReactElement<PropsWithChildren>),
        );
        break;
      }
      case Separator: {
        elements.push(encodeSeparator(current as ReactElement<SeparatorProps>));
        break;
      }
      default: {
        if (typeof current === "object") {
          const { children } = current.props as TextProps;
          if (typeof children === "string") {
            elements.push(encodeTextChild(current as ReactElement<TextProps>));
          } else {
            console.warn("Could not encode type:", current);
          }
        }
      }
    }
  });

  return elements;
}

function encodeContainer(
  element: ReactElement<ContainerProps>,
): EncodedContainerElement {
  const { children, ...props } = element.props;

  const encodedChildren = encodeChildren(
    Array.isArray(children) ? children : [children],
  );

  return {
    props: {
      ...props,
      children: encodedChildren.length > 0 ? encodedChildren : undefined,
    },
    type: "Container",
  };
}

function encodeDisplayModeToggle(
  element: ReactElement<DisplayModeToggleProps>,
): EncodedDisplayModeToggleElement {
  const { children, ...props } = element.props;

  const encodedChildren = encodeChildren(
    Array.isArray(children) ? children : [children],
  );

  return {
    props: {
      ...props,
      children: encodedChildren.length > 0 ? encodedChildren : undefined,
    },
    type: "DisplayModeToggle",
  };
}

function encodeGroup(element: ReactElement<GroupProps>): EncodedGroupElement {
  const { children, onLayoutChange: _, ...props } = element.props;

  const encodedChildren = encodeChildren(
    Array.isArray(children) ? children : [children],
  );

  return {
    props: {
      ...props,
      children: encodedChildren.length > 0 ? encodedChildren : undefined,
    },
    type: "Group",
  };
}

function encodePanel(element: ReactElement<PanelProps>): EncodedPanelElement {
  const { children, onResize: __, ...props } = element.props;

  const encodedChildren = encodeChildren(
    Array.isArray(children) ? children : [children],
  );

  return {
    props: {
      ...props,
      children: encodedChildren.length > 0 ? encodedChildren : undefined,
    },
    type: "Panel",
  };
}

function encodePopupWindow(
  element: ReactElement<PopupWindowProps>,
): EncodedPopupWindowElement {
  const { children, ...props } = element.props;

  const encodedChildren = encodeChildren(
    Array.isArray(children) ? children : [children],
  );

  return {
    props: {
      ...props,
      children: encodedChildren.length > 0 ? encodedChildren : undefined,
    },
    type: "PopupWindow",
  };
}

function encodeSeparator(
  element: ReactElement<SeparatorProps>,
): EncodedSeparatorElement {
  const { children: _, ...props } = element.props;

  return {
    type: "Separator",
    props,
  };
}

function encodeTextChild(element: ReactElement<TextProps>): EncodedTextElement {
  return {
    props: {
      children: element.props.children,
      className: element.props.className,
    },
    type: "Text",
  };
}
