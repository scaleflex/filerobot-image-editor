import React from 'react';
import { FitTheScreen } from '@scaleflex/icons';
import { IconButton } from '@scaleflex/ui/core';

import { toggleFullscreen } from 'utils/toggleFullscreen';

// TODO: Support different fullscreen style by adding background color ...etc.
const FullscreenButton = () => (
  <IconButton
    size="sm"
    color="link"
    onClick={toggleFullscreen}
  >
    <FitTheScreen size={12} />
  </IconButton>
);

export default FullscreenButton;
