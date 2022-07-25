/** External Dependencies */
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Revert from '@scaleflex/icons/revert';
import Warning from '@scaleflex/icons/warning';

/** Internal Dependencies */
import { useStore } from 'hooks';
import Modal from 'components/common/Modal';
import { RESET } from 'actions';
import { StyledHistoryButton } from './Topbar.styled';

const ResetButton = ({ margin }) => {
  const {
    dispatch,
    isResetted = true,
    theme,
    feedback,
    t,
    config,
  } = useStore();

  const isBlockerError = feedback.duration === 0;

  const [isModalOpened, setIsModalOpened] = useState(false);

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

  const WarningIcon = () => <Warning color={theme.palette.warning} size={25} />;

  return (
    <>
      <StyledHistoryButton
        className="FIE_topbar-reset-button"
        color="link"
        onClick={isResetted ? undefined : openModal}
        disabled={isResetted || isBlockerError}
        title={t('resetOperations')}
        margin={margin}
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

ResetButton.defaultProps = {
  margin: undefined,
};

ResetButton.propTypes = {
  margin: PropTypes.string,
};

export default ResetButton;
