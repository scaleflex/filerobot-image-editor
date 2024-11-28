/** External Dependencies */
import React, { memo } from 'react';

/** Internal Dependencies */
import App from 'components/Shared/AssemblyPoint';
import AssemblyPointProviders from 'components/Shared/Providers';
import Controls from 'components/VideoEditor/Controls';
import { TABS_IDS } from 'utils/constants';
import { VIDEO_TOOLS_ITEMS } from './tools.constant';

const VideoEditor = (props) => (
  <AssemblyPointProviders
    {...props}
    tabsIds={[TABS_IDS.ADJUST, TABS_IDS.TRIM, TABS_IDS.RESIZE]}
    disableResizeAfterRotation
    defaultTabId={TABS_IDS.ADJUST}
  >
    <App tools={VIDEO_TOOLS_ITEMS}>
      <Controls />
    </App>
  </AssemblyPointProviders>
);

export default memo(VideoEditor);
