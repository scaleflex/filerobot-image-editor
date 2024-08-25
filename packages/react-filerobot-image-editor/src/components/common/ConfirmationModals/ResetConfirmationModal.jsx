/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { useManageHistoryState, useStore } from 'hooks';
import ConfirmationModal from './ConfirmationModal';

const ResetConfirmationModal = ({ children, eventName = 'onClick' }) => {
  const { t } = useStore();
  const { reset } = useManageHistoryState();

  return (
    <ConfirmationModal
      title={t('warning')}
      hint={t('discardChangesWarningHint')}
      onConfirm={reset}
      eventName={eventName}
    >
      {children}
    </ConfirmationModal>
  );
};

ResetConfirmationModal.propTypes = {
  children: PropTypes.node.isRequired,
  eventName: PropTypes.string,
};

export default ResetConfirmationModal;
