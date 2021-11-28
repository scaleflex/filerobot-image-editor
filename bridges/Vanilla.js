/** External Dependencies */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

/** Internal Dependencies */
import AssemblyPoint from '../src/components/AssemblyPoint';
import deepMerge from '../src/utils/deepMerge';

class FilerobotImageEditor {
  constructor(container, config = {}) {
    this.container = container;
    this.config = config;

    if (!container || !(container instanceof HTMLElement)) {
      throw new Error(
        '`container` (argument 0) is required to initialize the image editor plugin.',
      );
    }

    this.render = render;
    this.unmount = unmountComponentAtNode;
  }

  init() {
    // eslint-disable-next-line react/jsx-filename-extension
    this.render(<AssemblyPoint {...this.config} />, this.container);
  }

  // TODO: check if this works fine with no issues and re-renders the affected functionalities on change.
  updateConfig(config = {}) {
    this.config = deepMerge(this.config || {}, config);
    const update = this.init;
    update();
  }

  terminate() {
    this.unmount(this.container);
  }
}

export default FilerobotImageEditor;
