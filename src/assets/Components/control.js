export default class Control {
  constructor(textArea, keyBoard) {
    this.textArea = textArea;
    this.keyBoard = keyBoard;
    this.CapsLock = false;
    this.ShiftLeft = false;
    this.ShiftRight = false;
    this.Alt = false;
    this.Language = 'en';
  }

  createListenerForVirtualButtons() {
    this.keyBoard.setKeys.forEach((key) => {
      key.addEventListener('click', (e) => {
        this.checkFunctionality(e.target.code);
      });
    });
  }

  createListenerForRealButtons() {
    document.addEventListener('keydown', (e) => {
      e.preventDefault();
      if (!e.repeat) {
        if (this.keyBoard.setCodes.includes(e.code)) {
          this.checkFunctionality(e.code);
        }
      }
    });
    document.addEventListener('keyup', (e) => {
      console.log(e);
      this.checkFunctionality(e.code);
    });
  }

  checkFunctionality(code) {
    this.changeStyleButton(code);
    if (code === 'CapsLock') {
      this.changeCapsLock();
    } else if (code === 'ShiftLeft') {
      if (this.Alt) {
        this.Alt = !this.Alt;
        this.changeLanguage();
      } else if (!this.ShiftRight) {
        this.changeShift();
        this.ShiftLeft = !this.ShiftLeft;
      }
    } else if (code === 'ShiftRight') {
      if (this.Alt) {
        this.Alt = !this.Alt;
        this.changeLanguage();
      } else if (!this.ShiftLeft) {
        this.changeShift();
        this.ShiftRight = !this.ShiftRight;
      }
    } else if (code === 'AltLeft') {
      this.Alt = !this.Alt;
      if (this.Alt && (this.ShiftLeft || this.ShiftRight)) {
        this.changeLanguage();
      }
    }
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
        } else if (this.CapsLock && (!this.ShiftLeft || !this.ShiftRight)) {
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
          if (this.CapsLock) {
            tempKey.innerText = key.content.ru.toUpperCase();
          } tempKey.innerText = key.content.ru;
        } else {
          if (this.CapsLock) {
            tempKey.innerText = key.content.en.toUpperCase();
          } tempKey.innerText = key.content.en;
        }
      }
    });
    if (this.Language === 'en') {
      this.Language = 'ru';
    } else {
      this.Language = 'en';
    }
  }

  changeStyleButton(code) {
    this.keyBoard.setKeys.forEach((key) => {
      const tempKey = key;
      if (tempKey.push && tempKey.code === code) {
        console.log('1');
        tempKey.classList.toggle('active_button');
      } else if (tempKey.code === code) {
        tempKey.classList.toggle('push_button');
      }
    });
  }
  // render(parent) {
  //     parent.append(this.element);
  //     return this;
  // }
}
