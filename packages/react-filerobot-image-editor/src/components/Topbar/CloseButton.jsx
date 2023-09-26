/** External Dependencies */
import React, { useState, useCallback } from 'react';
import CrossOutline from '@scaleflex/icons/cross-outline';
import { Warning } from '@scaleflex/icons';

/** Internal Dependencies */
import { useStore } from 'hooks';
import { RESET } from 'actions';
import Modal from 'components/common/Modal';
import { CLOSING_REASONS } from 'utils/constants';
import Separator from 'components/common/Separator';
import { StyledCloseButton } from './Topbar.styled';

const CloseButton = () => {
  const {
    haveNotSavedChanges,
    config: { onClose },
    t,
    theme,
    dispatch,
    isResetted = true,
    config,
  } = useStore();

  const [isModalOpened, setIsModalOpened] = useState(false);

  const WarningIcon = () => <Warning color={theme.palette.warning} size={25} />;

  // Hacky solution for avoiding (zoom & image info) components go to right if we have no close button.
  if (typeof onClose !== 'function') {
    return <span />;
  }

  const cancelModal = () => {
    setIsModalOpened(false);
  };

  const openModal = () => {
    setIsModalOpened(true);
  };

  const dispatchReset = useCallback(() => {
    dispatch({ type: RESET, payload: { config } });
    cancelModal();
  }, [config]);

  const closeWithReason = () => {
    onClose(CLOSING_REASONS.CLOSE_BUTTON, haveNotSavedChanges);
    dispatchReset();
    cancelModal();
  };

  return (
    <>
      <Separator />
      <StyledCloseButton
        className="FIE_topbar-close-button"
        color="basic"
        size="md"
        onClick={isResetted ? closeWithReason : openModal}
      >
        {onClose && <CrossOutline />}
      </StyledCloseButton>

      {isModalOpened && (
        <Modal
          title={t('discardChanges')}
          hint={t('discardChangesWarningHint')}
          isOpened={isModalOpened}
          onCancel={cancelModal}
          onDone={closeWithReason}
          Icon={WarningIcon}
          doneLabel={t('confirm')}
          doneButtonColor="warning-primary"
          cancelLabel={t('cancel')}
          width="400px"
          isWarning
        />
      )}
    </>
  );
};

export default CloseButton;
