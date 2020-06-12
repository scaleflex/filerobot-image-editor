import { render, unmountComponentAtNode } from 'react-dom';
import React from 'react';
import ImageEditor from '../react';


class FilerobotImageEditor {
  constructor(config = {}, callbacks, show = false) {
    const containerId = config.elementId || 'filerobot-image-editor';
    let container = document.getElementById(containerId);
    let onComplete = (src) => { console.log(src) };

    if (callbacks && typeof callbacks === 'function') { // to support old syntax
      onComplete = callbacks;
    } else {
      callbacks = callbacks || {};
      onComplete = callbacks.onComplete || onComplete;
    }

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
        onBeforeComplete={callbacks.onBeforeComplete}
        onOpen={callbacks.onOpen}
        onClose={callbacks.onClose}
      />, container);

    this.component = renderApp(ImageEditor);
    this.open = this.component.open;
    this.close = this.component.close;
    this.unmount = () => unmountComponentAtNode(container);
  }
}

window.FilerobotImageEditor = FilerobotImageEditor;