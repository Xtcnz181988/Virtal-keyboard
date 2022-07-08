export default class Text {
  constructor(node, style) {
    this.node = node;
    this.style = style;
  }

  render() {
    this.element = document.createElement(this.node);
    this.element.className = this.style;
    this.element.text = document.createElement('div');
    this.element.text.className = 'title_text';
    this.element.text.innerText = 'RSS Virtual Keyboard';
    this.element.description = document.createElement('div');
    this.element.description.className = 'text_description';
    this.element.description.innerText = 'Language switching - Shift + LeftAlt';
    this.element.description.text = document.createElement('div');
    this.element.description.text.className = 'text_description';
    this.element.description.text.innerText = 'Virtual Keyboard for Windows';
    this.element.append(this.element.text, this.element.description, this.element.description.text);
    document.body.append(this.element);
    return this;
  }
}
