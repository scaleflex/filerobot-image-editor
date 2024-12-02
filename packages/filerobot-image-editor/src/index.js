/** External Dependencies */
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';

/** Internal Dependencies */
import AssemblyPoint, { TOOLS, TABS } from 'react-filerobot-image-editor/src/';
import deepMerge from 'react-filerobot-image-editor/src/utils/deepMerge';

class FilerobotImageEditor {
  static TABS = TABS;
  static TOOLS = TOOLS;
  #root;
  #getCurrentMediaDataFnRef;
  #updateStateFnRef;

  constructor(container, config = {}) {
    this.container = container;
    this.config = config;

    if (!container || !(container instanceof HTMLElement)) {
      throw new Error(
        '`container` (argument 0) is required to initialize the image editor plugin.',
      );
    }

    this.#root = createRoot(this.container);
    this.#getCurrentMediaDataFnRef = {};
    this.#updateStateFnRef = {};

    this.getCurrentMediaData = this.getCurrentMediaData.bind(this);
    this.render = this.render.bind(this);
    this.terminate = this.terminate.bind(this);
    this.updateState = this.updateState.bind(this);
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
      getCurrentMediaDataFnRef: this.#getCurrentMediaDataFnRef,
      updateStateFnRef: this.#updateStateFnRef,
    };

    if (!this.#root._internalRoot) {
      this.#root = createRoot(this.container);
    }


    this.#root.render(createElement(AssemblyPoint, this.config));
  }

  terminate() {
    this.#root.unmount();
  }

  getCurrentMediaData(mediaFileInfo, pixelRatio, keepLoadingSpinnerShown) {
    return (
      this.#getCurrentMediaDataFnRef?.current?.(
        mediaFileInfo,
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
