import { RENDER_TO_DOM, replaceContent } from "./commons";
import { Component } from "./component";

export class TextWrapper extends Component {
  constructor(content) {
    super();
    this.type = "#text";
    this.content = content;
  }

  // use symbol to be private
  [RENDER_TO_DOM](range) {
    this.range = range;
    const el = document.createTextNode(this.content);
    replaceContent(range, el);
  }

  get vdom() {
    return this;
  }
}
