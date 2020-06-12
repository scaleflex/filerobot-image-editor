import { render, unmountComponentAtNode } from 'react-dom';
import React from 'react';
import ImageEditor from '../react';


class FilerobotImageEditor {
  constructor(config = {}, methods, show = false) {
    const containerId = config.elementId || 'filerobot-image-editor';
    let container = document.getElementById(containerId);
    let onComplete = (src) => { console.log(src) };

    if (methods && typeof methods === 'function') { // to support old syntax
      onComplete = methods;
    } else {
      methods = methods || {};
      onComplete = methods.onComplete || onComplete;
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
        onBeforeComplete={methods.onBeforeComplete}
        onOpen={methods.onOpen}
        onClose={methods.onClose}
      />, container);

    this.component = renderApp(ImageEditor);
    this.open = this.component.open;
    this.close = this.component.close;
    this.unmount = () => unmountComponentAtNode(container);
  }
}

window.FilerobotImageEditor = FilerobotImageEditor;