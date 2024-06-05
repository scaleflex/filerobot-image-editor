/** External Dependencies */
import React from 'react';
import CrossOutline from '@scaleflex/icons/cross-outline';
import CrossButton from '@scaleflex/ui/core/cross-button';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { useStore } from 'hooks';
import ConfirmationModal from '../common/ConfirmationModal';

const StyledCloseButton = styled(CrossButton)`
  padding: 8px;
  z-index: 111;
`;

const CloseButton = ({ onClose, ...props }) => {
  const {
    config: { onClose: configOnClose },
  } = useStore();

  const onCloseFn = onClose || configOnClose;
  if (typeof onCloseFn !== 'function') {
    return null;
  }

  return (
    <ConfirmationModal>
      <StyledCloseButton
        className="FIE_buttons-close-btn"
        color="basic"
        size="md"
        {...props}
      >
        <CrossOutline />
      </StyledCloseButton>
    </ConfirmationModal>
  );
};

CloseButton.propTypes = {
  onClose: PropTypes.func,
};

export default CloseButton;
