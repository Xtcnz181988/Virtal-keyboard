import 'normalize.css';
import './style.css';
import './assets/styles/main.css';
import './assets/styles/fonts.css';

import Control from './assets/Components/control';
import TextArea from './assets/Components/textarea';
import KeyBoard from './assets/Components/keyboard';
import BUTTONS from './assets/Data/buttons';
import Text from './assets/Components/titletext';

window.onload = () => {
  const text = new Text('div', 'wrapper_text');
  text.render();

  const textArea = new TextArea('textarea', 'textarea', 7, 100);
  textArea.createElement().render(document.body);

  const keyBoard = new KeyBoard(BUTTONS);
  keyBoard.createKeyBoard().createRowsKeys();

  const control = new Control(textArea, keyBoard);
  control.createListenerForVirtualButtons();
  control.createListenerForRealButtons();

  const data = JSON.stringify('en');

  if (!localStorage.getItem('languageSetting')) {
    localStorage.clear();
    localStorage.setItem('languageSetting', data);
  }
};
