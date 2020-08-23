import { RENDER_TO_DOM, replaceContent } from "./commons";
import { Component } from "./component";

export class ElementWrapper extends Component {
  constructor(type) {
    super();
    this.type = type;
  }

  get vdom() {
    this.vchildren = this.children.map((child) => child.vdom);
    return this;
  }

  // use symbol to be private
  [RENDER_TO_DOM](range) {
    this.range = range;

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

    if (!this.vchildren) {
      this.vchildren = this.children.map((child) => child.vdom);
    }

    for (const child of this.vchildren) {
      const childRange = document.createRange();
      childRange.setStart(el, el.childNodes.length);
      childRange.setEnd(el, el.childNodes.length);
      child[RENDER_TO_DOM](childRange);
    }

    replaceContent(range, el);
  }
}
