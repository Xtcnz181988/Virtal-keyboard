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
            this.changeLanguage();
          } else if (!this.ShiftRight) {
            this.changeShift(e.target.code);
          }
          this.ShiftLeft = !this.ShiftLeft;
        } else if (e.target.code === 'ShiftRight') {
          e.target.classList.toggle('active_button');
          if (this.Alt) {
            this.changeLanguage();
          } else if (!this.ShiftLeft) {
            this.changeShift(e.target.code);
          }
          this.ShiftRight = !this.ShiftRight;
        } else if (e.target.code === 'AltLeft' || e.target.code === 'AltRight') {
          this.Alt = !this.Alt;
          e.target.classList.toggle('active_button');
          if (this.ShiftLeft || this.ShiftRight) {
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
    console.log(this.Language);
    this.keyBoard.setKeys.forEach((key) => {
      const tempKey = key;
      tempKey.classList.remove('active_button');
      if (this.Language === 'en') {
        tempKey.innerText = key.content.ru;
      } else {
        tempKey.innerText = key.content.en;
      }
    });
    if (this.Language === 'en') {
      this.Language = 'ru';
    } else {
      this.Language = 'en';
    }
    this.ShiftLeft = false;
    this.ShiftRight = false;
    this.Alt = !this.Alt;
    console.log(this.Language);
  }

  // render(parent) {
  //     parent.append(this.element);
  //     return this;
  // }
}
