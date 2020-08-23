import { ElementWrapper } from "./element-wrapper";
import { TextWrapper } from "./text-wrapper";
import { RENDER_TO_DOM } from "./commons";

const appendChildren = (parent, children) => {
  for (let child of children) {
    if (child === null) {
      continue;
    }
    if (typeof child === "object" && child instanceof Array) {
      appendChildren(parent, child);
    } else {
      if (typeof child === "string" || typeof child === "number") {
        child = new TextWrapper(child);
      }
      parent.appendChild(child);
    }
  }
};

export const createElement = (type, attributes, ...children) => {
  let element;
  if (typeof type === "string") {
    element = new ElementWrapper(type);
  } else {
    element = new type();
  }
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }

  appendChildren(element, children);
  return element;
};

export const render = (component, parent) => {
  const range = document.createRange();
  range.setStart(parent, 0);
  range.setEnd(parent, parent.childNodes.length);
  range.deleteContents();
  component[RENDER_TO_DOM](range);
};
