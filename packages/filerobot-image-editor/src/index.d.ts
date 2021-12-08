import { FilerobotImageEditorConfig, TABS, TOOLS } from 'react-filerobot-image-editor';

/*~ Write your module's methods and properties in this class */
declare class FilerobotImageEditor {
  TABS: TABS;
  TOOLS: TOOLS;
  constructor(container: HTMLElement, config: FilerobotImageEditorConfig);
  render(additionalConfig?: FilerobotImageEditorConfig): void;
  terminate(): void;
}

export default FilerobotImageEditor;