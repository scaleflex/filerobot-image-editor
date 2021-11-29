/** External Dependencies */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

/** Internal Dependencies */
import AssemblyPoint, { TOOLS, TABS } from '../src';
import deepMerge from '../src/utils/deepMerge';

class FilerobotImageEditor {
  static TABS = TABS;
  static TOOLS = TOOLS;
  #render;
  #unmount;

  /**
   * @constructor
   * @param {HTMLElement} container
   * @param {import("../src/context/config").ConfigProps} config
   */
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

  /**
   * @param {import("../src/context/config").ConfigProps} additionalConfig
   * @returns {void}
   */
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

  /**
   * @returns {void}
   */
  terminate() {
    this.#unmount(this.container);
  }
}

export default FilerobotImageEditor;
