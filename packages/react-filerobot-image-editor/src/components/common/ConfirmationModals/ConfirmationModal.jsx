/** External Dependencies */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Warning } from '@scaleflex/icons';
import { useTheme } from '@scaleflex/ui/theme/hooks';

/** Internal Dependencies */
import { useStore } from 'hooks';
import Modal from 'components/common/Modal';

const WarningIcon = () => {
  const theme = useTheme();
  return <Warning color={theme.palette.warning} size={25} />;
};

const ConfirmationModal = ({
  children,
  eventName = 'onClick',
  onEventName,
  onConfirm,
  title,
  hint,
}) => {
  const { t } = useStore();

  const [isModalOpened, setIsModalOpened] = useState(false);

  const cancelModal = () => {
    setIsModalOpened(false);
  };

  const openModal = () => {
    setIsModalOpened(true);
  };

  const handleConfirmation = () => {
    if (typeof onConfirm === 'function') {
      const confirmationRes = onConfirm();
      if (confirmationRes instanceof Promise) {
        confirmationRes.then(cancelModal);
        return;
      }
    }

    cancelModal();
  };

  return (
    <>
      {React.cloneElement(children, {
        [eventName]: onEventName || openModal,
      })}

      {isModalOpened && (
        <Modal
          title={title || t('discardChanges')}
          hint={hint || t('discardChangesWarningHint')}
          isOpened={isModalOpened}
          onCancel={cancelModal}
          onDone={handleConfirmation}
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

ConfirmationModal.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  hint: PropTypes.string,
  eventName: PropTypes.string,
  onEventName: PropTypes.func,
  onConfirm: PropTypes.func,
};

export default ConfirmationModal;
