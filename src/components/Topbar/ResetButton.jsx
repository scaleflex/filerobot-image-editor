/** External Dependencies */
import React, { useCallback, useState } from 'react';
import { Revert } from '@scaleflex/icons';

/** Internal Dependencies */
import { useStore } from 'hooks';
import Modal from 'components/common/Modal';
import { RESET } from 'actions';
import { StyledHistoryButton, StyledWarningIcon } from './Topbar.styled';

const ResetButton = () => {
  const { dispatch, isResetted = true } = useStore();
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
          hint="Do you want to continue?"
          isOpened={isModalOpened}
          onCancel={cancelModal}
          onDone={dispatchReset}
          Icon={StyledWarningIcon}
        />
      )}
    </>
  );
};

export default ResetButton;
