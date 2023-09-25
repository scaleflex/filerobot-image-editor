/** External Dependencies */
import React from 'react';
import { Button } from '@scaleflex/ui/core';
import ArrowLeftOutline from '@scaleflex/icons/arrow-left-outline';

/** Internal Dependencies */
import { useStore } from 'hooks';
import { CLOSING_REASONS } from 'utils/constants';
import { StyledBackButtonLabel } from './Topbar.styled';

const BackButton = () => {
  const {
    t,
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
    <Button
      className="FIE_topbar-back-button"
      color="link-secondary"
      size="sm"
      onClick={closeWithReason}
      startIcon={<ArrowLeftOutline />}
    >
      <StyledBackButtonLabel>{t('back')}</StyledBackButtonLabel>
    </Button>
  );
};

export default BackButton;
