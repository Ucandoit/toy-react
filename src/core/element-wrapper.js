export class ElementWrapper {
  constructor(type) {
    this.el = document.createElement(type);
  }

  setAttribute(name, value) {
    this.el.setAttribute(name, value);
  }

  appendChild(component) {
    this.el.appendChild(component.el);
  }
}
