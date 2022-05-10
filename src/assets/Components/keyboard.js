export default class KeyBoard {
  constructor(buttons) {
    this.buttons = buttons;
    this.setKeys = [];
    this.setCodes = [];
  }

  createKeyBoard() {
    this.KeyBoard = document.createElement('div');
    this.KeyBoard.className = 'wrapper-keyboard';
    document.body.append(this.KeyBoard);
    return this;
  }

  createRowsKeys() {
    for (let row = 1; row <= 5; row += 1) {
      this.row = document.createElement('div');
      this.row.className = 'row';
      this.buttons.forEach((element) => {
        if (element.row === row) {
          this.key = document.createElement('button');
          this.key.className = element.style;
          if (JSON.parse(localStorage.getItem('languageSetting')) === 'en') {
            this.key.innerText = element.content.en;
          } else {
            this.key.innerText = element.content.ru;
          }
          this.key.symbol = element.symbol;
          this.key.push = element.push;
          this.key.content = element.content;
          this.key.altContent = element.altContent;
          this.key.code = element.code;
          this.setCodes.push(element.code);
          this.key.row = element.row;
          this.setKeys.push(this.key);
          this.row.append(this.key);
        }
        this.KeyBoard.append(this.row);
      });
    }
    return this;
  }
}
