/** External Dependencies */
import React, { memo } from 'react';

/** Internal Dependencies */
import App from 'components/App';
import AssemblyPointProviders from 'components/Providers';
import Controls from 'components/VideoEditor/Controls';

const VideoEditor = (props) => (
  <AssemblyPointProviders disableResizeAfterRotation {...props}>
    <App>
      <Controls />
    </App>
  </AssemblyPointProviders>
);

export default memo(VideoEditor);
