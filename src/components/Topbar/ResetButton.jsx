/** External Dependencies */
import React, { useCallback, useState } from 'react';
import { Revert, Warning } from '@scaleflex/icons';

/** Internal Dependencies */
import { useStore } from 'hooks';
import Modal from 'components/common/Modal';
import { RESET } from 'actions';
import { StyledHistoryButton } from './Topbar.styled';

const ResetButton = () => {
  const { dispatch, isResetted = true, theme } = useStore();

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
        title="Reset/delete all operations"
      >
        <Revert size={12} />
      </StyledHistoryButton>
      {isModalOpened && (
        <Modal
          title="All changes will be lost"
          hint="Are you sure you want to continue?"
          isOpened={isModalOpened}
          onCancel={cancelModal}
          onDone={dispatchReset}
          Icon={WarningIcon}
          doneLabel="Continue"
          cancelLabel="Cancel"
          doneButtonColor="error"
          doneButtonStyle={{ background: theme.palette.warning }}
        />
      )}
    </>
  );
};

export default ResetButton;
