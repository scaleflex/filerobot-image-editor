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
  onClick,
  icon,
  doneButtonLabel,
  doneButtonColor = 'warning-primary',
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

    if (typeof onClick === 'function') {
      onClick();
    }
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
          Icon={icon || WarningIcon}
          doneLabel={doneButtonLabel || t('confirm')}
          doneButtonColor={doneButtonColor}
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
  onClick: PropTypes.func,
  onConfirm: PropTypes.func,
  doneButtonLabel: PropTypes.string,
  doneButtonColor: PropTypes.string,
  icon: PropTypes.elementType,
};

export default ConfirmationModal;
