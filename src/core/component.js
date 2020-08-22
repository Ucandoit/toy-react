export class Component {
  constructor() {
    this.props = Object.create(null); // better than {}
    this.children = [];
    this._el = null;
  }

  setAttribute(name, value) {
    this.props[name] = value;
  }

  appendChild(component) {
    this.children.push(component);
  }

  get el() {
    if (!this._el) {
      // call render function recrusively to get dom element
      this._el = this.render().el;
    }
    return this._el;
  }
}
