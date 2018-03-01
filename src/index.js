import { render, unmountComponentAtNode } from 'react-dom';
import React from 'react';
import ImageEditorWrapper from './ImageEditorWrapper';
import 'scaleflex-react-ui-kit/dist/styledComponents/assets/styles/scaleflex-icon-font.css';
import registerServiceWorker from './registerServiceWorker';


function init(options = {}, isOpened = false) {
  const editor = document.getElementById(options.ELEMENT_ID || 'airstore-image-editor');
  options = Object.assign(options || {});
  options.onUpload = options.onUpload || function (src) { console.log(src) };

  const renderApp = Component => render(<Component config={options} onUpload={options.onUpload}/>, editor);

  window.AirstoreImageEditor = renderApp(ImageEditorWrapper);
  window.AirstoreImageEditor.init = init;
  window.AirstoreImageEditor.unmount = () => unmountComponentAtNode(editor);

  registerServiceWorker();
}

window.AirstoreImageEditor = window.AirstoreImageEditor || {};
window.AirstoreImageEditor.init = init;