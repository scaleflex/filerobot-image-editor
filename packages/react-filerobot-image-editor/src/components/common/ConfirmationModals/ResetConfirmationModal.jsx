/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { useStore } from 'hooks';
import { RESET } from 'actions';
import ConfirmationModal from './ConfirmationModal';

const ResetConfirmationModal = ({ children, eventName = 'onClick' }) => {
  const { t, config, dispatch } = useStore();

  const dispatchReset = () => {
    dispatch({ type: RESET, payload: { config } });
  };

  return (
    <ConfirmationModal
      title={t('warning')}
      hint={t('discardChangesWarningHint')}
      onConfirm={dispatchReset}
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
