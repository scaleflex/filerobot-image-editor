import React from 'react';
import { Undo } from '@scaleflex/icons';
import { IconButton } from '@scaleflex/ui/core';

const UndoButton = () => (
  <IconButton
    size="sm"
    color="link"
  >
    <Undo size={12} />
  </IconButton>
);

export default UndoButton;
