import { RENDER_TO_DOM } from "./commons";

export class TextWrapper {
  constructor(content) {
    this.el = document.createTextNode(content);
  }

  // use symbol to be private
  [RENDER_TO_DOM](range) {
    range.deleteContents();
    range.insertNode(this.el);
  }
}
