import React from 'react';
import { render } from 'react-dom';

import App from './components/App';

const demoProps = {
  imageSrc: 'https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/1fc0fa2c240b628c4117efd4c2b56ce8'
}

render(
  <App {...demoProps} />,
  document.getElementById('root')
);
