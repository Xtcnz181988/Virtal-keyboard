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
    this.Language = 'en';
    this.arrFunctionalityBottons = ['CapsLock', 'ShiftRight', 'ControlLeft', 'ControlRight', 'AltLeft', 'ShiftLeft'];
    this.selectionStart = 0;
    this.selectionEnd = 0;
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
          this.checkFunctionality(eventKeyUp, eventKeyUp.code);
        }
      }
    });
  }

  checkFunctionality(e, code) {
    if (code === 'CapsLock') {
      this.changeCapsLock();
    } else if (code === 'ShiftLeft') {
      console.log(this.AltLeft);
      if (this.AltLeft) {
        console.log('входит');
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
    //   console.log('ШИФТ')
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
        // if (e.type === 'click') {
        //     if (tempKey.code ==='ShiftLeft' || tempKey.code === 'ShiftLeft' || tempKey.code === 'AltLeft') {
        //       tempKey.classList.remove('active_button');
        //     }
        //     this.changeShift();
        //     this.AltLeft = false;
        //     this.ShiftLeft = false;
        //     this.ShiftRight = false;
        // }
      });
      if (this.Language === 'en') {
        this.Language = 'ru';
      } else {
        this.Language = 'en';
      }
    }
    console.log(this.AltLeft);
    if (this.ShiftLeft || this.ShiftRight) {
      this.AltLeft = false;
    } else if (this.AltLeft) {
      this.ShiftLeft = false;
    }
    console.log(this.AltLeft);
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
    this.textArea.element.selectionStart = this.selectionStart;
    let symbol;
    this.keyBoard.setKeys.forEach(key => {
        const tempKey = key;
        if (tempKey.code === code) {
            if (tempKey.code === 'Tab') {
                symbol = '\t';
            } else if (tempKey.code === 'Enter') {
                symbol = '\r';
            } else if (tempKey.code === 'Backspace') {
                symbol = '\r';
            } else if (tempKey.code === 'Delete') {
                console.log('Delete');
            } else {
                symbol = tempKey.textContent;
            }
        }
    })
    this.textArea.element.selectionStart = 0;
    // this.textArea.element.selectionEnd = this.textArea.selectionEnd;
    this.textArea.element.focus();
    let start = this.textArea.element.selectionStart;
    let end = this.textArea.element.selectionEnd;
    let stringStart = '';
    let stringEnd = '';
    const length = this.textArea.element.value.length;
    const value = this.textArea.element.value;
    console.log(value)
    if (start === end) {
        console.log('1')
        if (start === length) {
            stringStart = value + symbol;
        } else if (start < length) {
            stringStart = value.slice(0, start) + symbol;
            stringEnd = value.slice(start, length)
        }  
    }
    
    

    this.textArea.element.value = stringStart + stringEnd;
    this.selectionStart = this.textArea.element.selectionStart;
    // this.textArea.selectionEnd = this.textArea.element.selectionEnd;
  }
}
