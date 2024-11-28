/** External Dependencies */
import React, { memo } from 'react';

/** Internal Dependencies */
import App from 'components/Shared/AssemblyPoint';
import AssemblyPointProviders from 'components/Shared/Providers';
import { IMAGE_TOOLS_ITEMS } from './Tools/tools.constant';

const ImageEditor = (props) => (
  <AssemblyPointProviders {...props}>
    <App tools={IMAGE_TOOLS_ITEMS} />
  </AssemblyPointProviders>
);

export default memo(ImageEditor);
