import React from 'react';
import { Popup } from '@scaleflex/ui/core';

const defaultAnchorOrigin = {
  horizontal: 'center',
  vertical: 'bottom',
};

const RobotPopup = ({
  anchorOrigin = defaultAnchorOrigin, message = '', show = false, status, onClose,
}) => (
  <Popup
    anchorOrigin={anchorOrigin}
    autoHideDuration={3000}
    message={message}
    open={show}
    status={status}
    onClose={onClose}
  />
);

export default RobotPopup;
