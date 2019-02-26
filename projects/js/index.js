import { render, unmountComponentAtNode } from 'react-dom';
import React from 'react';
import ImageEditor from '../react';


function init(config = {}, onComplete = (src) => { console.log(src) }, show = false) {
  const containerId = config.elementId || 'airstore-image-editor';
  let container = document.getElementById(containerId);

  if (!container) {
    container = document.createElement('div');
    container.id = containerId;

    document.body.appendChild(container);
  }

  const renderApp = Component => render(
    <Component
      show={show}
      config={config}
      onComplete={onComplete}
    />, container);

  window.FilerobotImageEditor = renderApp(ImageEditor);
  window.FilerobotImageEditor.init = init;
  window.FilerobotImageEditor.unmount = () => unmountComponentAtNode(container);
}

window.FilerobotImageEditor = window.FilerobotImageEditor || {};
window.FilerobotImageEditor.init = init;