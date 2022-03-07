/** External Dependencies */
import React from 'react';
import ArrowLeftOutline from '@scaleflex/icons/arrow-left-outline';

/** Internal Dependencies */
import { useStore } from 'hooks';
import { CLOSING_REASONS } from 'utils/constants';
import {
  StyledBackButtonLabel,
  StyledCloseOrBackButton,
} from './Topbar.styled';

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
    <StyledCloseOrBackButton
      className="FIE_topbar-back-button"
      color="link"
      size="sm"
      onClick={closeWithReason}
    >
      {onClose && (
        <>
          <ArrowLeftOutline size={9} />
          <StyledBackButtonLabel>{t('back')}</StyledBackButtonLabel>
        </>
      )}
    </StyledCloseOrBackButton>
  );
};

export default BackButton;
