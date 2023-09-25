/** External Dependencies */
import React from 'react';
import CrossOutline from '@scaleflex/icons/cross-outline';

/** Internal Dependencies */
import { useStore } from 'hooks';
import { CLOSING_REASONS } from 'utils/constants';
import Separator from 'components/common/Separator';
import { StyledCloseButton } from './Topbar.styled';

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
    <>
      <Separator />
      <StyledCloseButton
        className="FIE_topbar-close-button"
        color="basic"
        size="md"
        onClick={closeWithReason}
      >
        {onClose && <CrossOutline />}
      </StyledCloseButton>
    </>
  );
};

export default CloseButton;
