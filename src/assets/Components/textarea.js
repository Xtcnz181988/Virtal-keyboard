export default class TextArea {
  constructor(typeNode, style, rows, cols) {
    this.type = typeNode;
    this.style = style;
    this.rows = rows;
    this.cols = cols;
  }

  createElement() {
    this.element = document.createElement(this.type);
    this.element.className = this.style;
    this.element.rows = this.rows;
    this.element.cols = this.cols;
    // this.element.autofocus = true;
    return this;
  }

  render(parent) { // MAYBE REMOVE
    parent.append(this.element);
    return this;
  }
}
