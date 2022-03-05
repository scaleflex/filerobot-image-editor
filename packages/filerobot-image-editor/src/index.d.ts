import { FilerobotImageEditorConfig, TABS, TOOLS } from 'react-filerobot-image-editor';

declare class FilerobotImageEditor {
  TABS: typeof TABS;
  TOOLS: typeof TOOLS;
  constructor(container: HTMLElement, config: FilerobotImageEditorConfig);
  render(additionalConfig?: FilerobotImageEditorConfig): void;
  terminate(): void;
}

export default FilerobotImageEditor;
