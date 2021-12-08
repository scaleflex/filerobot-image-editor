/** External Dependencies */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

/** Internal Dependencies */
import AssemblyPoint, { TOOLS, TABS } from 'react-filerobot-image-editor';
import deepMerge from 'react-filerobot-image-editor/lib/utils/deepMerge';

class FilerobotImageEditor {
  static TABS = TABS;
  static TOOLS = TOOLS;
  #render;
  #unmount;

  constructor(container, config = {}) {
    this.container = container;
    this.config = config;

    if (!container || !(container instanceof HTMLElement)) {
      throw new Error(
        '`container` (argument 0) is required to initialize the image editor plugin.',
      );
    }

    this.#render = render;
    this.#unmount = unmountComponentAtNode;
  }

  // TODO: check if this works fine with no issues and re-renders the affected functionalities on changing additionalConfig
  render(additionalConfig) {
    if (typeof additionalConfig === 'object') {
      this.config = this.config = deepMerge(
        this.config || {},
        additionalConfig,
      );
    }

    // eslint-disable-next-line react/jsx-filename-extension
    this.#render(<AssemblyPoint {...this.config} />, this.container);
  }

  terminate() {
    this.#unmount(this.container);
  }
}

export default FilerobotImageEditor;

export { TOOLS, TABS };
