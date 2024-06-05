/** External Dependencies */
import React from 'react';
import Reset from '@scaleflex/icons/reset';

/** Internal Dependencies */
import { useStore } from 'hooks';
import { StyledHistoryButton } from './HistoryButtons.styled';
import ConfirmationModal from '../../common/ConfirmationModal';

const ResetButton = (props) => {
  const { isResetted = true, feedback, t } = useStore();

  const isBlockerError = feedback.duration === 0;

  return (
    <ConfirmationModal isReset>
      <StyledHistoryButton
        className="FIE_buttons-reset-btn"
        color="basic"
        size="sm"
        disabled={isResetted || isBlockerError}
        title={t('resetOperations')}
        {...props}
      >
        <Reset />
      </StyledHistoryButton>
    </ConfirmationModal>
  );
};

export default ResetButton;