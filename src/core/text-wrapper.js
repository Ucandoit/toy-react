import { RENDER_TO_DOM } from "./commons";
import { Component } from "./component";

export class TextWrapper extends Component {
  constructor(content) {
    super();
    this.type = "#text";
    this.content = content;
    this.el = document.createTextNode(content);
  }

  // use symbol to be private
  [RENDER_TO_DOM](range) {
    range.deleteContents();
    range.insertNode(this.el);
  }

  get vdom() {
    return this;
  }
}
