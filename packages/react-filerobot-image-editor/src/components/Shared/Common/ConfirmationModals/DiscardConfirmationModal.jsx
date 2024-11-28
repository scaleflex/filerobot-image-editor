/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { useStore } from 'hooks';
import { RESET } from 'actions';
import { CLOSING_REASONS } from 'utils/constants';
import ConfirmationModal from './ConfirmationModal';

const DiscardConfirmationModal = ({
  children,
  onDiscard,
  eventName = 'onClick',
  discardReason,
}) => {
  const {
    t,
    config,
    dispatch,
    haveNotSavedChanges,
    isResetted = true,
    config: { onClose, onBack },
  } = useStore();

  const discardWithReason = () => {
    const discardFn = onDiscard || onClose || onBack;
    if (typeof discardFn === 'function') {
      const reason =
        discardReason ||
        (onClose && CLOSING_REASONS.CLOSE_BUTTON) ||
        (onBack && CLOSING_REASONS.BACK_BUTTON);
      discardFn(reason || '', haveNotSavedChanges);
    }

    dispatch({ type: RESET, payload: { config } });
  };

  return (
    <ConfirmationModal
      title={t('discardChanges')}
      hint={t('discardChangesWarningHint')}
      eventName={eventName}
      onEventName={isResetted ? discardWithReason : undefined}
      onConfirm={discardWithReason}
    >
      {children}
    </ConfirmationModal>
  );
};

DiscardConfirmationModal.propTypes = {
  children: PropTypes.node.isRequired,
  eventName: PropTypes.string,
  onDiscard: PropTypes.func,
  discardReason: PropTypes.string,
};

export default DiscardConfirmationModal;
