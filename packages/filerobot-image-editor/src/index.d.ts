import { FilerobotImageEditorConfig, TABS, TOOLS, getCurrentImgDataFunction } from 'react-filerobot-image-editor';

declare class FilerobotImageEditor {
  TABS: typeof TABS;
  TOOLS: typeof TOOLS;
  constructor(container: HTMLElement, config: FilerobotImageEditorConfig);
  render(additionalConfig?: FilerobotImageEditorConfig): void;
  terminate(): void;
  getCurrentImgData: getCurrentImgDataFunction;
  updateState: (newStatePart: {} | ((currentState: {}) => void)) => void;
}

export default FilerobotImageEditor;
