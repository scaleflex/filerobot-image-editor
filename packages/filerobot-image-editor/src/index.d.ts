import { FilerobotImageEditorConfig } from 'react-filerobot-image-editor';

/*~ Write your module's methods and properties in this class */
declare class FilerobotImageEditor {
  constructor(container: HTMLElement, config: FilerobotImageEditorConfig);
  render(additionalConfig?: FilerobotImageEditorConfig): void;
  terminate(): void;
}

export default FilerobotImageEditor;