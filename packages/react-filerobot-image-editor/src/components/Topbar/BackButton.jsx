/** External Dependencies */
import React, { useState, useCallback } from 'react';
import { Button } from '@scaleflex/ui/core';
import ArrowLeftOutline from '@scaleflex/icons/arrow-left-outline';
import { Warning } from '@scaleflex/icons';

/** Internal Dependencies */
import { useStore } from 'hooks';
import { RESET } from 'actions';
import { CLOSING_REASONS } from 'utils/constants';
import Modal from 'components/common/Modal';
import { StyledBackButtonLabel } from './Topbar.styled';

const BackButton = () => {
  const {
    t,
    theme,
    dispatch,
    isResetted = true,
    haveNotSavedChanges,
    config,
    config: { onClose },
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
      <Button
        className="FIE_topbar-back-button"
        color="link-secondary"
        size="sm"
        onClick={isResetted ? closeWithReason : openModal}
        startIcon={<ArrowLeftOutline />}
      >
        <StyledBackButtonLabel>{t('back')}</StyledBackButtonLabel>
      </Button>

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

export default BackButton;
