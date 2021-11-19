/** External Dependencies */
import React, { useCallback, useState } from 'react';
import { Revert, Warning } from '@scaleflex/icons';

/** Internal Dependencies */
import { useStore } from 'hooks';
import Modal from 'components/common/Modal';
import { RESET } from 'actions';
import { StyledHistoryButton } from './Topbar.styled';

const ResetButton = () => {
  const { dispatch, isResetted = true, theme, t } = useStore();

  const [isModalOpened, setIsModalOpened] = useState(false);

  const cancelModal = () => {
    setIsModalOpened(false);
  };

  const openModal = () => {
    setIsModalOpened(true);
  };

  const dispatchReset = useCallback(() => {
    dispatch({ type: RESET });
    cancelModal();
  }, []);

  const WarningIcon = () => <Warning color={theme.palette.warning} size={25} />;

  return (
    <>
      <StyledHistoryButton
        color="link"
        onClick={isResetted ? undefined : openModal}
        disabled={isResetted}
        title={t('resetOperations')}
      >
        <Revert size={12} />
      </StyledHistoryButton>
      {isModalOpened && (
        <Modal
          title={t('changesLoseConfirmation')}
          hint={t('changesLoseConfirmationHint')}
          isOpened={isModalOpened}
          onCancel={cancelModal}
          onDone={dispatchReset}
          Icon={WarningIcon}
          doneLabel={t('continue')}
          cancelLabel={t('cancel')}
          doneButtonColor="error"
          doneButtonStyle={{ background: theme.palette.warning }}
        />
      )}
    </>
  );
};

export default ResetButton;
