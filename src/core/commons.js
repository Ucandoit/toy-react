export const RENDER_TO_DOM = Symbol("renderToDom");

export const replaceContent = (range, node) => {
  range.insertNode(node);
  range.setStartAfter(node);
  range.deleteContents();
  range.setStartBefore(node);
  range.setEndAfter(node);
};
