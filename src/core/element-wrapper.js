import { RENDER_TO_DOM } from "./commons";

export class ElementWrapper {
  constructor(type) {
    this.el = document.createElement(type);
  }

  setAttribute(name, value) {
    if (name.match(/^on([\s\S]+)/)) {
      this.el.addEventListener(
        RegExp.$1.replace(/^[\s\S]/, (c) => c.toLowerCase()),
        value
      );
    } else {
      this.el.setAttribute(name, value);
    }
  }

  appendChild(component) {
    const range = document.createRange();
    range.setStart(this.el, this.el.childNodes.length);
    range.setEnd(this.el, this.el.childNodes.length);
    component[RENDER_TO_DOM](range);
  }

  // use symbol to be private
  [RENDER_TO_DOM](range) {
    range.deleteContents();
    range.insertNode(this.el);
  }
}
