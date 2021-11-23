/** External Dependencies */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { merge } from 'lodash-es';

/** Internal Dependencies */
import { TABS_IDS, TOOLS_IDS } from '../src/utils/constants';
import AssemblyPoint from '../src/components/AssemblyPoint';

class FilerobotImageEditor {
  static TABS = TABS_IDS;
  static TOOLS = TOOLS_IDS;

  constructor(container, config = {}) {
    this.container = container;
    this.config = config;

    if (!container || !(container instanceof container)) {
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
    this.config = merge(this.config || {}, config);
    const update = this.init;
    update();
  }

  terminate() {
    this.unmount(this.container);
  }
}

export default FilerobotImageEditor;
