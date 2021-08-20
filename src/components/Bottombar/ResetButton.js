import React from 'react';
import { Reset } from '@scaleflex/icons';
import { IconButton } from '@scaleflex/ui/core';

const ResetButton = () => (
  <IconButton
    size="sm"
    color="link"
  >
    <Reset size={12} />
  </IconButton>
);

export default ResetButton;
