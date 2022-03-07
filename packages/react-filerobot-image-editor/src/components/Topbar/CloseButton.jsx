/** External Dependencies */
import React from 'react';
import CrossOutline from '@scaleflex/icons/cross-outline';

/** Internal Dependencies */
import { useStore } from 'hooks';
import { CLOSING_REASONS } from 'utils/constants';
import { StyledCloseOrBackButton } from './Topbar.styled';

const CloseButton = () => {
  const {
    haveNotSavedChanges,
    config: { onClose },
  } = useStore();

  // Hacky solution for avoiding (zoom & image info) components go to right if we have no close button.
  if (typeof onClose !== 'function') {
    return <span />;
  }

  const closeWithReason = () => {
    onClose(CLOSING_REASONS.CLOSE_BUTTON, haveNotSavedChanges);
  };

  return (
    <StyledCloseOrBackButton
      className="FIE_topbar-close-button"
      color="link"
      size="sm"
      onClick={closeWithReason}
    >
      {onClose && <CrossOutline />}
    </StyledCloseOrBackButton>
  );
};

export default CloseButton;
