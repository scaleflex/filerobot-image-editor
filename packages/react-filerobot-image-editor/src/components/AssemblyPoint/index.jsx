/** External Dependencies */
import React, { memo } from 'react';

/** Internal Dependencies */
import App from 'components/App';
import AssemblyPointProviders from './Providers';

const AssemblyPoint = (props) => (
  <AssemblyPointProviders {...props}>
    <App />
  </AssemblyPointProviders>
);

export default memo(AssemblyPoint);
