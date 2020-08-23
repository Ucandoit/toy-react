import { RENDER_TO_DOM } from "./commons";

export class Component {
  constructor() {
    this.props = Object.create(null); // better than {}
    this.children = [];
    this._el = null;
    this.range = null;
  }

  setAttribute(name, value) {
    this.props[name] = value;
  }

  appendChild(component) {
    this.children.push(component);
  }

  get vdom() {
    return this.render().vdom;
  }

  get vchildren() {
    return this.children.map((child) => child.vdom);
  }

  setState(newState) {
    if (this.state === null || typeof this.state !== "object") {
      this.state = newState;
      this.rerender();
      return;
    }
    const merge = (oldState, newState) => {
      for (const key in newState) {
        if (oldState[key] === null || typeof oldState[key] !== "object") {
          oldState[key] = newState[key];
        } else {
          merge(oldState[key], newState[key]);
        }
      }
    };
    merge(this.state, newState);
    this.rerender();
  }

  // use symbol to be private
  [RENDER_TO_DOM](range) {
    this.range = range;
    this.render()[RENDER_TO_DOM](range);
  }

  rerender() {
    const oldRange = this.range;

    const range = document.createRange();
    range.setStart(oldRange.startContainer, oldRange.startOffset);
    range.setEnd(oldRange.startContainer, oldRange.startOffset);
    this[RENDER_TO_DOM](range);

    oldRange.setStart(range.endContainer, range.endOffset);
    oldRange.deleteContents();
    // this.range.deleteContents();
    // this[RENDER_TO_DOM](this.range);
  }
}
