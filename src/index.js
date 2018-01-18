import React from 'react';
import { render } from 'react-dom';
import ImageEditor from './ImageEditor';
import registerServiceWorker from './registerServiceWorker';
import 'cropperjs/dist/cropper.css';

render(<ImageEditor />, document.getElementById('image-editor'));

registerServiceWorker();
