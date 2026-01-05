import { createElement, type ReactElement } from "react";
import type {
  GroupProps,
  PanelProps,
  SeparatorProps,
} from "react-resizable-panels";
import { Container } from "../../../src/components/Container";
import { DisplayModeToggle } from "../../../src/components/DisplayModeToggle";
import { Group } from "../../../src/components/Group";
import { Panel } from "../../../src/components/Panel";
import { PopupWindow } from "../../../src/components/PopupWindow";
import { Separator } from "../../../src/components/Separator";
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

type Config = {
  groupProps?: Partial<GroupProps>;
  panelProps?: Partial<PanelProps>;
};

let key = 0;

export function decode(stringified: string, config: Config = {}) {
  const json = JSON.parse(stringified) as EncodedElement[];

  return decodeChildren(json, config);
}

function decodeChildren(
  children: EncodedElement[],
  config: Config,
): ReactElement<unknown>[] {
  const elements: ReactElement<unknown>[] = [];

  children.forEach((current) => {
    if (!current) {
      return;
    }

    switch (current.type) {
      case "Container": {
        elements.push(decodeContainer(current, config));
        break;
      }
      case "DisplayModeToggle": {
        elements.push(decodeDisplayModeToggle(current, config));
        break;
      }
      case "Group": {
        elements.push(decodeGroup(current, config));
        break;
      }
      case "Panel": {
        elements.push(decodePanel(current, config));
        break;
      }
      case "PopupWindow": {
        elements.push(decodePopupWindow(current, config));
        break;
      }
      case "Separator": {
        elements.push(decodeSeparator(current));
        break;
      }
      case "Text": {
        elements.push(decodeText(current));
        break;
      }
      default: {
        console.warn("Could not decode type:", current);
      }
    }
  });

  return elements;
}

function decodeContainer(
  json: EncodedContainerElement,
  config: Config,
): ReactElement<unknown> {
  const { children, ...props } = json.props;

  return createElement(Container, {
    key: ++key,
    ...props,
    ...config.panelProps,
    children: children ? decodeChildren(children, config) : undefined,
  });
}

function decodeDisplayModeToggle(
  json: EncodedDisplayModeToggleElement,
  config: Config,
): ReactElement<unknown> {
  const { children, ...props } = json.props;

  return createElement(DisplayModeToggle, {
    key: ++key,
    ...props,
    ...config.panelProps,
    children: children ? decodeChildren(children, config) : undefined,
  });
}

function decodeGroup(
  json: EncodedGroupElement,
  config: Config,
): ReactElement<PanelProps> {
  const { children, ...props } = json.props;

  return createElement(Group, {
    key: ++key,
    ...props,
    ...config.groupProps,
    children: children ? decodeChildren(children, config) : undefined,
  });
}

function decodePanel(
  json: EncodedPanelElement,
  config: Config,
): ReactElement<PanelProps> {
  const { children, ...props } = json.props;

  return createElement(Panel, {
    key: ++key,
    ...props,
    ...config.panelProps,
    children: children ? decodeChildren(children, config) : undefined,
  });
}

function decodePopupWindow(
  json: EncodedPopupWindowElement,
  config: Config,
): ReactElement<unknown> {
  const { children, ...props } = json.props;

  return createElement(PopupWindow, {
    key: ++key,
    ...props,
    ...config.panelProps,
    children: children ? decodeChildren(children, config) : undefined,
  });
}

function decodeSeparator(
  json: EncodedSeparatorElement,
): ReactElement<SeparatorProps> {
  return createElement(Separator, {
    key: ++key,
    ...json.props,
  });
}

function decodeText(json: EncodedTextElement): ReactElement<TextProps> {
  return createElement("div", {
    key: ++key,
    ...json.props,
  });
}
