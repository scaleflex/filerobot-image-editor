/** External Dependencies */
import React from 'react';
import CrossOutline from '@scaleflex/icons/cross-outline';
import CrossButton from '@scaleflex/ui/core/cross-button';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { useStore } from 'hooks';
import { CLOSING_REASONS } from 'utils/constants';
import { DiscardConfirmationModal } from '../common/ConfirmationModals';

const StyledCloseButton = styled(CrossButton)`
  padding: 8px;
  z-index: 111;
`;

const CloseButton = ({ onClose, prefix, ...props }) => {
  const {
    config: { onClose: configOnClose },
  } = useStore();

  const onCloseFn = onClose || configOnClose;
  if (typeof onCloseFn !== 'function') {
    return null;
  }

  return (
    <>
      {prefix}
      <DiscardConfirmationModal
        onDiscard={onCloseFn}
        discardReason={CLOSING_REASONS.CLOSE_BUTTON}
      >
        <StyledCloseButton
          data-testid="FIE-close-button"
          className="FIE_buttons-close-btn"
          color="basic"
          size="md"
          {...props}
        >
          <CrossOutline />
        </StyledCloseButton>
      </DiscardConfirmationModal>
    </>
  );
};

CloseButton.propTypes = {
  prefix: PropTypes.node,
  onClose: PropTypes.func,
};

export default CloseButton;
