export default class Control {
  constructor(textArea, keyBoard) {
    this.textArea = textArea;
    this.keyBoard = keyBoard;
    this.CapsLock = false;
    this.ShiftLeft = false;
    this.ShiftRight = false;
    this.Ctrl = false;
    this.Alt = false;
    this.Language = 'en';
  }

  createListener() {
    this.keyBoard.setKeys.forEach((key) => {
      key.addEventListener('click', (e) => {
        if (e.target.code === 'CapsLock') {
          e.target.classList.toggle('active_button');
          this.changeCapsLock();
        } else if (e.target.code === 'ShiftLeft') {
          e.target.classList.toggle('active_button');
          if (this.Alt) {
            console.log('3');
            this.Alt = !this.Alt;
            this.changeLanguage();
          } else if (!this.ShiftRight) {
            this.changeShift(e.target.code);
            this.ShiftLeft = !this.ShiftLeft;
          }
        } else if (e.target.code === 'ShiftRight') {
          e.target.classList.toggle('active_button');
          if (this.Alt) {
            console.log('2');
            this.Alt = !this.Alt;
            this.changeLanguage();
          } else if (!this.ShiftLeft) {
            this.changeShift(e.target.code);
            this.ShiftRight = !this.ShiftRight;
          }
        } else if (e.target.code === 'AltLeft') {
          this.Alt = !this.Alt;
          e.target.classList.toggle('active_button');
          if (this.Alt && (this.ShiftLeft || this.ShiftRight)) {
            console.log('1');
            this.changeLanguage();
          }
        }
      });
    });
  }

  changeCapsLock() {
    this.keyBoard.setKeys.forEach((key) => {
      const tempKey = key;
      if (key.symbol === 'letter' || key.symbol === 'other') {
        if (!this.CapsLock) {
          tempKey.innerText = key.innerText.toUpperCase();
        } else if (this.CapsLock && (this.ShiftLeft || this.ShiftRight)) {
          tempKey.innerText = key.innerText.toUpperCase();
        } else {
          tempKey.innerText = key.innerText.toLowerCase();
        }
      }
    });
    this.CapsLock = !this.CapsLock;
  }

  changeShift() {
    this.keyBoard.setKeys.forEach((key) => {
      const tempKey = key;
      if (key.symbol === 'letter' || key.symbol === 'other' || key.symbol === 'digits') {
        if (!this.CapsLock && !this.ShiftLeft && !this.ShiftRight) {
          tempKey.innerText = key.altContent[`${this.Language}`].toUpperCase();
        } else if (this.CapsLock && (this.ShiftLeft || this.ShiftRight)) {
          tempKey.innerText = key.content[`${this.Language}`].toUpperCase();
        } else if (this.CapsLock && (!this.ShiftLeft || !this.ShiftR)) {
          tempKey.innerText = key.altContent[`${this.Language}`].toLowerCase();
        } else {
          tempKey.innerText = key.content[`${this.Language}`].toLowerCase();
        }
      }
    });
  }

  changeLanguage() {
    this.ShiftLeft = false;
    this.ShiftRight = false;
    this.Alt = false;
    this.keyBoard.setKeys.forEach((key) => {
      const tempKey = key;
      if (tempKey.code !== 'CapsLock') {
        tempKey.classList.remove('active_button');
      }
      if (key.symbol === 'letter' || key.symbol === 'other' || key.symbol === 'digits') {
        if (this.Language === 'en') {
          this.CapsLock ? tempKey.innerText = key.content.ru.toUpperCase() : tempKey.innerText = key.content.ru;
        } else {
          this.CapsLock ? tempKey.innerText = key.content.en.toUpperCase() : tempKey.innerText = key.content.en;
        }
      }
    });
    if (this.Language === 'en') {
      this.Language = 'ru';
    } else {
      this.Language = 'en';
    }
  }

  // render(parent) {
  //     parent.append(this.element);
  //     return this;
  // }
}
