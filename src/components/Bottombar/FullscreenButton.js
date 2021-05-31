import React from 'react';
import { FitTheScreen } from "@scaleflex/icons"
import { IconButton } from "@scaleflex/ui/core";

const FullscreenButton = () => {
  return (
    <IconButton
      size="sm"
      color="link"
    >
      <FitTheScreen size={12} />
    </IconButton>
  )
}

export default FullscreenButton;
