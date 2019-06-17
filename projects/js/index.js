import { render, unmountComponentAtNode } from 'react-dom';
import React from 'react';
import ImageEditor from '../react';


class FilerobotImageEditor {
  constructor(config = {}, onComplete = (src) => { console.log(src) }, show = false) {
    const containerId = config.elementId || 'filerobot-image-editor';
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

    this.component = renderApp(ImageEditor);
    this.open = this.component.open;
    this.close = this.component.close;
    this.unmount = () => unmountComponentAtNode(container);
  }
}

window.FilerobotImageEditor = FilerobotImageEditor;