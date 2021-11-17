import React from 'react';
import { render } from 'react-dom';

import AssemblyPoint from './components/AssemblyPoint';

const config = {
  // string or image html element
  image:
    'https://images.unsplash.com/photo-1553451166-232112bda6f6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920',
  annotationsCommon: {
    opacity: 0.3,
  },
  // onClose: () => console.log('closed'),
  // tabsIds: ['ADJUST', 'ANNOTATE', 'WATERMARK'],
  // defaultTabId: 'ANNOTATE',
  // defaultToolId: 'Image',
};

render(
  // eslint-disable-next-line react/jsx-filename-extension
  <AssemblyPoint {...config} />,
  document.getElementById('root'),
);
