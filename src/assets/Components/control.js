export default class Control {
  constructor(textArea, keyBoard) {
    this.textArea = textArea;
    this.keyBoard = keyBoard;
    this.CapsLock = false;
    this.ShiftLeft = false;
    this.ShiftRight = false;
    this.ControlLeft = false;
    this.ControlRight = false;
    this.AltLeft = false;
    this.Language = JSON.parse(localStorage.getItem('languageSetting'));
    this.arrFunctionalityBottons = ['CapsLock', 'ShiftRight', 'ControlLeft', 'ControlRight', 'AltLeft', 'AltRight', 'ShiftLeft', 'MetaLeft'];
  }

  createListenerForVirtualButtons() {
    this.keyBoard.setKeys.forEach((key) => {
      key.addEventListener('click', (eventClick) => {
        this.changeStyleButton(eventClick, eventClick.target.code);
        this.checkFunctionality(eventClick, eventClick.target.code);
        this.print(eventClick.target.code);
      });
    });
  }

  createListenerForRealButtons() {
    document.addEventListener('keydown', (eventKeyDown) => {
      eventKeyDown.preventDefault();
      if (this.arrFunctionalityBottons.includes(eventKeyDown.code) && !eventKeyDown.repeat) {
        if (this.keyBoard.setCodes.includes(eventKeyDown.code)) {
          this.checkFunctionality(eventKeyDown, eventKeyDown.code);
          this.changeStyleButton(eventKeyDown, eventKeyDown.code);
        }
      } else if (!this.arrFunctionalityBottons.includes(eventKeyDown.code)) {
        this.changeStyleButton(eventKeyDown, eventKeyDown.code);
        this.print(eventKeyDown.code);
      }
    });

    document.addEventListener('keyup', (eventKeyUp) => {
      if (this.keyBoard.setCodes.includes(eventKeyUp.code)) {
        this.changeStyleButton(eventKeyUp, eventKeyUp.code);
        if (eventKeyUp.code !== 'CapsLock') {
          if (eventKeyUp.code === 'ShiftRight' && this.ShiftRight) {
            this.checkFunctionality(eventKeyUp, eventKeyUp.code);
          } else if (eventKeyUp.code === 'ShiftLeft' && this.ShiftLeft) {
            this.checkFunctionality(eventKeyUp, eventKeyUp.code);
          } else if (eventKeyUp.code === 'ControlLeft' && this.ControlLeft) {
            this.checkFunctionality(eventKeyUp, eventKeyUp.code);
          } else if (eventKeyUp.code === 'ControlLeft' && this.ControlRight) {
            this.checkFunctionality(eventKeyUp, eventKeyUp.code);
          } else if (eventKeyUp.code === 'AltLeft' && this.AltLeft) {
            this.checkFunctionality(eventKeyUp, eventKeyUp.code);
          } else if (eventKeyUp.code === 'AltRight' && this.AltRight) {
            this.checkFunctionality(eventKeyUp, eventKeyUp.code);
          } else if (!this.arrFunctionalityBottons.includes(eventKeyUp.code)) {
            this.checkFunctionality(eventKeyUp, eventKeyUp.code);
          }
        }
      }
    });
  }

  checkFunctionality(e, code) {
    if (code === 'CapsLock') {
      this.changeCapsLock();
    } else if (code === 'ShiftLeft') {
      if (this.AltLeft) {
        this.ShiftLeft = !this.ShiftLeft;
        this.changeLanguage(e);
      } else if (!this.ShiftRight) {
        this.changeShift();
        this.ShiftLeft = !this.ShiftLeft;
      } else if (this.ShiftRight) {
        this.ShiftLeft = !this.ShiftLeft;
      }
    } else if (code === 'ShiftRight') {
      if (this.AltLeft) {
        this.AltLeft = !this.AltLeft;
        this.changeLanguage(e);
      } else if (!this.ShiftLeft) {
        this.changeShift();
        this.ShiftRight = !this.ShiftRight;
      } else if (this.ShiftLeft) {
        this.ShiftRight = !this.ShiftRight;
      }
    } else if (code === 'AltLeft') {
      this.AltLeft = !this.AltLeft;
      if (this.AltLeft && (this.ShiftLeft || this.ShiftRight)) {
        this.changeLanguage(e);
      }
    } else if (code === 'ControlLeft') {
      this.ControlLeft = !this.ControlLeft;
    } else if (code === 'ControlRight') {
      this.ControlRight = !this.ControlRight;
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

  changeLanguage(e) {
    if (e.type !== 'keyup') {
      this.keyBoard.setKeys.forEach((key) => {
        const tempKey = key;
        if (key.symbol === 'letter' || key.symbol === 'other' || key.symbol === 'digits') {
          if (this.Language === 'en') {
            if (!this.CapsLock && (this.ShiftLeft || this.ShiftRight)) {
              tempKey.innerText = key.content.ru.toUpperCase();
            } else if (this.CapsLock && (this.ShiftLeft || this.ShiftRight)) {
              tempKey.innerText = key.content.ru.toLowerCase();
            }
          } else if (!this.CapsLock && (this.ShiftLeft || this.ShiftRight)) {
            tempKey.innerText = key.content.en.toUpperCase();
          } else if (this.CapsLock && (this.ShiftLeft || this.ShiftRight)) {
            tempKey.innerText = key.content.en.toLowerCase();
          }
        }
        if (e.type === 'click') {
          const tkc = tempKey.code;
          if (tkc === 'ShiftLeft' || tkc === 'ShiftLeft' || tkc === 'AltLeft') {
            tempKey.classList.remove('active_button');
          }
        }
      });
      if (this.Language === 'en') {
        this.Language = 'ru';
        localStorage.setItem('languageSetting', JSON.stringify(this.Language));
      } else {
        this.Language = 'en';
        localStorage.setItem('languageSetting', JSON.stringify(this.Language));
      }
    }
    if (this.ShiftLeft || this.ShiftRight) {
      this.AltLeft = false;
    } else if (this.AltLeft) {
      this.ShiftLeft = false;
    }
    if (e.type === 'click') {
      this.AltLeft = false;
      this.ShiftLeft = false;
      this.ShiftRight = false;
      this.keyBoard.setKeys.forEach((key) => {
        if (key.symbol === 'letter' || key.symbol === 'other' || key.symbol === 'digits') {
          const tempKey = key;
          tempKey.innerText = tempKey.innerText.toLowerCase();
        }
      });
    }
  }

  changeStyleButton(e, code) {
    if (e.type === 'click') {
      if (this.arrFunctionalityBottons.includes(code)) {
        e.target.classList.toggle('active_button');
      }
      if (!this.arrFunctionalityBottons.includes(code)) {
        e.target.classList.remove('push_button');
      }
    } else if (e.type === 'keydown') {
      if (this.arrFunctionalityBottons.includes(code)) {
        this.keyBoard.setKeys.forEach((key) => {
          const tempKey = key;
          if (tempKey.code === code && code === 'CapsLock') {
            tempKey.classList.toggle('active_button');
          } else if (tempKey.code === code) {
            tempKey.classList.add('active_button');
          }
        });
      } else {
        this.keyBoard.setKeys.forEach((key) => {
          const tempKey = key;
          if (tempKey.code === code) {
            tempKey.classList.add('push_button');
          }
        });
      }
    } else if (e.type === 'keyup') {
      if (this.arrFunctionalityBottons.includes(code)) {
        this.keyBoard.setKeys.forEach((key) => {
          const tempKey = key;
          if (tempKey.code === code && code !== 'CapsLock') {
            tempKey.classList.remove('active_button');
          }
        });
      } else {
        this.keyBoard.setKeys.forEach((key) => {
          const tempKey = key;
          if (tempKey.code === code) {
            tempKey.classList.remove('push_button');
          }
        });
      }
    }
  }

  print(code) {
    this.textArea.element.focus();

    const { value } = this.textArea.element;
    const { length } = this.textArea.element.value;

    let symbol = '';
    const start = this.textArea.element.selectionStart;
    const end = this.textArea.element.selectionEnd;

    const stringStart = this.textArea.element.value.slice(0, start);
    const stringEnd = this.textArea.element.value.slice(start, length);

    this.keyBoard.setKeys.forEach((key) => {
      const tempKey = key;
      if (tempKey.code === code && !this.arrFunctionalityBottons.includes(tempKey.code)) {
        if (tempKey.code === 'Tab') {
          symbol = '\t';
          this.textArea.element.value = stringStart + symbol + stringEnd;
          this.textArea.element.setSelectionRange(start, end);
          this.textArea.element.selectionStart = start + 1;
        } else if (tempKey.code === 'Enter') {
          symbol = '\r';
          this.textArea.element.value = stringStart + symbol + stringEnd;
        } else if (tempKey.code === 'Backspace') {
          if (start === end) {
            symbol = stringStart.slice(0, -1) + stringEnd;
            this.textArea.element.value = symbol;
            this.textArea.element.setSelectionRange(stringStart.length - 1, stringEnd.length - 1);
          } else {
            symbol = stringStart.slice(0, start) + value.slice(end, length);
            this.textArea.element.value = symbol;
            this.textArea.element.setSelectionRange(stringStart.length, stringStart.length);
          }
        } else if (tempKey.code === 'Delete') {
          if (start === end) {
            symbol = stringStart + stringEnd.slice(1);
            this.textArea.element.value = symbol;
            this.textArea.element.setSelectionRange(stringStart.length, stringStart.length);
          } else {
            symbol = stringStart.slice(0, start) + value.slice(end, length);
            this.textArea.element.value = symbol;
            this.textArea.element.setSelectionRange(stringStart.length, stringStart.length);
          }
        } else if (start === end) {
          symbol = tempKey.textContent;
          this.textArea.element.value = stringStart + symbol + stringEnd;
          this.textArea.element.setSelectionRange(start, end);
          this.textArea.element.selectionStart = start + 1;
        } else if (start !== end) {
          symbol = tempKey.textContent;
          const stringPartStart = stringStart.slice(0, start);
          const stringPartEnd = value.slice(end, length);
          this.textArea.element.value = stringPartStart + symbol + stringPartEnd;
          this.textArea.element.setSelectionRange(stringStart.length, stringStart.length);
          this.textArea.element.selectionStart = start + 1;
        }
      }
    });
  }
}
