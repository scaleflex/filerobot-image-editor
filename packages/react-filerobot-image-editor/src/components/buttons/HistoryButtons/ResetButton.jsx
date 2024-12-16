/** External Dependencies */
import React from 'react';
import Reset from '@scaleflex/icons/reset';

/** Internal Dependencies */
import { useStore } from 'hooks';
import { StyledHistoryButton } from './HistoryButtons.styled';
import { ResetConfirmationModal } from '../../common/ConfirmationModals';

const ResetButton = (props) => {
  const { isResetted = true, feedback, t } = useStore();

  const isBlockerError = feedback.duration === 0;

  return (
    <ResetConfirmationModal>
      <StyledHistoryButton
        className="FIE_buttons-reset-btn"
        data-testid="FIE-reset-button"
        color="basic"
        size="sm"
        disabled={isResetted || isBlockerError}
        title={t('resetOperations')}
        {...props}
      >
        <Reset />
      </StyledHistoryButton>
    </ResetConfirmationModal>
  );
};

export default ResetButton;
