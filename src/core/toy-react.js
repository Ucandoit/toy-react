import { ElementWrapper } from "./element-wrapper";
import { TextWrapper } from "./text-wrapper";

const appendChildren = (parent, children) => {
  for (let child of children) {
    if (typeof child === "object" && child instanceof Array) {
      appendChildren(parent, child);
    } else {
      if (typeof child === "string") {
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
  parent.appendChild(component.el);
};
