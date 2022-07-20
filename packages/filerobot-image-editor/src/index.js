/** External Dependencies */
import { createElement } from 'react';
import { createRoot } from 'react-dom/client'

/** Internal Dependencies */
import AssemblyPoint, { TOOLS, TABS } from 'react-filerobot-image-editor/src/';
import deepMerge from 'react-filerobot-image-editor/src/utils/deepMerge';

class FilerobotImageEditor {
  static TABS = TABS;
  static TOOLS = TOOLS;
  #root;
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

    this.#root = createRoot(this.container)
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
    this.#root.render(createElement(AssemblyPoint, this.config));
  }

  terminate() {
    this.#root.unmount();
  }

  getCurrentImgData(imageFileInfo, pixelRatio, keepLoadingSpinnerShown) {
    return (
      this.#getCurrentImgDataFnRef?.current?.(
        imageFileInfo,
        pixelRatio,
        keepLoadingSpinnerShown,
      ) || {}
    );
  }

  updateState(newStatePart) {
    this.#updateStateFnRef?.current?.(newStatePart);
  }
}

FilerobotImageEditor.TABS = TABS;
FilerobotImageEditor.TOOLS = TOOLS;

export default FilerobotImageEditor;
