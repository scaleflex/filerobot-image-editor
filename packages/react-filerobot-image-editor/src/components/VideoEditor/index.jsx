/** External Dependencies */
import React, { memo } from 'react';

/** Internal Dependencies */
import App from 'components/App';
import AssemblyPointProviders from 'components/Providers';
import Controls from 'components/VideoEditor/Controls';
import { TABS_IDS } from 'utils/constants';

const VideoEditor = (props) => (
  <AssemblyPointProviders
    {...props}
    tabsIds={[TABS_IDS.ADJUST, TABS_IDS.TRIM, TABS_IDS.RESIZE]}
    disableResizeAfterRotation
    defaultTabId={TABS_IDS.ADJUST}
  >
    <App>
      <Controls />
    </App>
  </AssemblyPointProviders>
);

export default memo(VideoEditor);
