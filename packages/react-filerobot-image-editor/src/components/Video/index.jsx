/** External Dependencies */
import React, { memo } from 'react';

/** Internal Dependencies */
import App from 'components/App';
import AssemblyPointProviders from 'components/AssemblyPoint/Providers';
import { TABS } from 'index';
import Controls from 'components/Video/Controls';

const Video = (props) => (
  <AssemblyPointProviders
    {...props}
    tabsIds={[TABS.ADJUST]}
    disableResizeAfterRotation
    defaultTabId={TABS.ADJUST}
  >
    <App>
      <Controls />
    </App>
  </AssemblyPointProviders>
);

export default memo(Video);
