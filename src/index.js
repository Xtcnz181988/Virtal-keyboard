import 'normalize.css';
import './style.css';
import './assets/styles/main.css';
import './assets/styles/fonts.css';

import Control from './assets/Components/control';
import TextArea from './assets/Components/textarea';
import KeyBoard from './assets/Components/keyboard';
import BUTTONS from './assets/Data/buttons';

const textArea = new TextArea('textarea', 'textarea', 7, 100);
textArea.createElement().render(document.body);
textArea.printText('Hello'); // REMOVE AFTER

const keyBoard = new KeyBoard(BUTTONS);
keyBoard.createKeyBoard().createRowsKeys();
console.log(keyBoard); // REMOVE AFTER

const control = new Control(textArea, keyBoard);
control.createListenerForVirtualButtons();
control.createListenerForRealButtons();
console.log(control); // REMOVE AFTERS

// const textArea = new Component('textarea', 'textarea');
// textArea.renderComponent(document.body);

// import TextArea from './assets/Components/textarea';
// import KeyBoard from './assets/Components/keyboard';

// new TextArea('textarea', 'textarea').render(document.body);

// const keyBoard = new KeyBoard();
// console.log(keyBoard)
// keyBoard.createKeyBoard()
// console.log(textArea)
// const keyBo = document.querySelector('.keyboard');

// const row = new Component('div', 'row');
// row.render(keyBo);

// console.log(keyboard);

// const wrapper = new Component ('div', 'wrapper');
// wrapper.render(document.body);
