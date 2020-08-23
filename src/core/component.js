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

  setState(newState) {
    if (this.state === null || typeof this.state !== "object") {
      this.state = newState;
      this.update();
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
    this.update();
  }

  // use symbol to be private
  [RENDER_TO_DOM](range) {
    this.range = range;
    this._vdom = this.vdom;
    this._vdom[RENDER_TO_DOM](range);
  }

  update() {
    const isSameNode = (oldNode, newNode) => {
      if (oldNode.type !== newNode.type) {
        return false;
      }
      for (const name in newNode.props) {
        if (newNode.props[name] !== oldNode.props[name]) {
          return false;
        }
      }
      if (
        Object.keys(oldNode.props).length !== Object.keys(oldNode.props).length
      ) {
        return false;
      }
      if (newNode.type === "#text") {
        if (newNode.content !== oldNode.content) {
          return false;
        }
      }
      return true;
    };
    const update = (oldNode, newNode) => {
      if (!isSameNode(oldNode, newNode)) {
        newNode[RENDER_TO_DOM](oldNode.range);
        return;
      }
      newNode.range = oldNode.range;

      const newChildren = newNode.vchildren;
      const oldChildren = oldNode.vchildren;

      if (!newChildren || !newChildren.length) {
        return;
      }

      let tailRange = oldChildren[oldChildren.length - 1].range;

      for (let i = 0; i < newChildren.length; i++) {
        const newChild = newChildren[i];
        const oldChild = oldChildren[i];
        if (i < oldChildren.length) {
          update(oldChild, newChild);
        } else {
          const range = document.createRange();
          range.setStart(tailRange.endContainer, tailRange.endOffset);
          range.setEnd(tailRange.endContainer, tailRange.endOffset);
          newChild[RENDER_TO_DOM](range);
          tailRange = range;
        }
      }
    };
    const vdom = this.vdom;
    update(this._vdom, vdom);
    this._vdom = vdom;
  }

  // rerender() {
  //   const oldRange = this.range;

  //   const range = document.createRange();
  //   range.setStart(oldRange.startContainer, oldRange.startOffset);
  //   range.setEnd(oldRange.startContainer, oldRange.startOffset);
  //   this[RENDER_TO_DOM](range);

  //   oldRange.setStart(range.endContainer, range.endOffset);
  //   oldRange.deleteContents();
  //   // this.range.deleteContents();
  //   // this[RENDER_TO_DOM](this.range);
  // }
}
