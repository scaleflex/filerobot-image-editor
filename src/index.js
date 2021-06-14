import React from 'react';
import { render } from 'react-dom';

import App from './components/App';

const demoProps = {
  // string or image html element
  image: 'https://images.unsplash.com/photo-1553451166-232112bda6f6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920'
}

render(
  <App {...demoProps} />,
  document.getElementById('root')
);
