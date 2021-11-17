/** External Dependencies */
import React from 'react';
import { Cross } from '@scaleflex/icons';
import { IconButton } from '@scaleflex/ui/core';

/** Internal Dependencies */
import { useStore } from 'hooks';

const CloseButton = () => {
  const {
    config: { onClose },
  } = useStore();

  // Hacky solution for avoiding zoom, image info go to right if we have no close button.
  if (!onClose) {
    return <span />;
  }

  return (
    <IconButton color="link" size="sm" onClick={onClose}>
      {onClose && <Cross />}
    </IconButton>
  );
};

export default CloseButton;
