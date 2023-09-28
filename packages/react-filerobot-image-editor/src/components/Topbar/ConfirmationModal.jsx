/** External Dependencies */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Warning } from '@scaleflex/icons';

/** Internal Dependencies */
import { useStore } from 'hooks';
import { RESET } from 'actions';
import Modal from 'components/common/Modal';
import { CLOSING_REASONS } from 'utils/constants';

const ConfirmationModal = ({ children, isReset }) => {
  const {
    t,
    theme,
    config,
    dispatch,
    isResetted = true,
    haveNotSavedChanges,
    config: { onClose },
  } = useStore();

  const [isModalOpened, setIsModalOpened] = useState(false);

  const WarningIcon = () => <Warning color={theme.palette.warning} size={25} />;

  //   Hacky solution for avoiding (zoom & image info) components go to right if we have no close button.
  if (typeof onClose !== 'function' && !isReset) {
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
    if (isReset) return;

    onClose(CLOSING_REASONS.CLOSE_BUTTON, haveNotSavedChanges);
    dispatchReset();
  };

  return (
    <>
      {React.cloneElement(children, {
        onClick: isResetted ? closeWithReason : openModal,
      })}

      {isModalOpened && (
        <Modal
          title={isReset ? t('warning') : t('discardChanges')}
          hint={
            isReset
              ? t('changesLoseWarningHint')
              : t('discardChangesWarningHint')
          }
          isOpened={isModalOpened}
          onCancel={cancelModal}
          onDone={isReset ? dispatchReset : closeWithReason}
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

ConfirmationModal.defaultProps = {
  isReset: false,
};

ConfirmationModal.propTypes = {
  children: PropTypes.node.isRequired,
  isReset: PropTypes.bool,
};

export default ConfirmationModal;
