import { RENDER_TO_DOM } from "./commons";
import { Component } from "./component";

export class ElementWrapper extends Component {
  constructor(type) {
    super();
    this.type = type;
  }

  get vdom() {
    return this;
  }

  // use symbol to be private
  [RENDER_TO_DOM](range) {
    range.deleteContents();

    const el = document.createElement(this.type);

    for (const name in this.props) {
      const value = this.props[name];
      if (name.match(/^on([\s\S]+)/)) {
        el.addEventListener(
          RegExp.$1.replace(/^[\s\S]/, (c) => c.toLowerCase()),
          value
        );
      } else {
        if (name === "className") {
          el.setAttribute("class", value);
        } else {
          el.setAttribute(name, value);
        }
      }
    }

    for (const child of this.children) {
      const childRange = document.createRange();
      childRange.setStart(el, el.childNodes.length);
      childRange.setEnd(el, el.childNodes.length);
      child[RENDER_TO_DOM](childRange);
    }

    range.insertNode(el);
  }
}
