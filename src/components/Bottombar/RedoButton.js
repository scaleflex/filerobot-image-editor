import React from 'react';
import { Redo } from "@scaleflex/icons"
import { IconButton } from "@scaleflex/ui/core";

const RedoButton = () => {
  return (
    <IconButton
      size="sm"
      color="link"
    >
      <Redo size={12} />
    </IconButton>
  )
}

export default RedoButton;
