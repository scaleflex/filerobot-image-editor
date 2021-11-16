/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Cross } from '@scaleflex/icons';
import { IconButton } from '@scaleflex/ui/core';

const CloseButton = ({ onClose }) => (
  <IconButton color="link" size="sm" onClick={onClose}>
    <Cross />
  </IconButton>
);

CloseButton.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default CloseButton;
