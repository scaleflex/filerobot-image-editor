/** External Dependencies */
import { createElement } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

/** Internal Dependencies */
import AssemblyPoint, { TOOLS, TABS } from 'react-filerobot-image-editor/src/';
import deepMerge from 'react-filerobot-image-editor/src/utils/deepMerge';

class FilerobotImageEditor {
  static TABS = TABS;
  static TOOLS = TOOLS;
  #render;
  #unmount;
  #getCurrentImgDataFnRef;
  #updateStateFnRef;

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
    this.#getCurrentImgDataFnRef = {};
    this.#updateStateFnRef = {};
  }

  render(additionalConfig) {
    if (typeof additionalConfig === 'object') {
      this.config = this.config = deepMerge(
        this.config || {},
        additionalConfig,
      );
    }

    this.config = {
      ...this.config,
      getCurrentImgDataFnRef: this.#getCurrentImgDataFnRef,
      updateStateFnRef: this.#updateStateFnRef,
    };
    this.#render(createElement(AssemblyPoint, this.config), this.container);
  }

  terminate() {
    this.#unmount(this.container);
  }

  getCurrentImgData(props) {
    return this.#getCurrentImgDataFnRef?.current?.(props) || {};
  }

  updateState(newStatePart) {
    this.#updateStateFnRef?.current?.(newStatePart);
  }
}

FilerobotImageEditor.TABS = TABS;
FilerobotImageEditor.TOOLS = TOOLS;

export default FilerobotImageEditor;
