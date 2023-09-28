/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import Revert from '@scaleflex/icons/revert';

/** Internal Dependencies */
import { useStore } from 'hooks';
import { StyledHistoryButton } from './Topbar.styled';
import ConfirmationModal from './ConfirmationModal';

const ResetButton = ({ margin, showBackButton }) => {
  const { isResetted = true, feedback, t } = useStore();

  const isBlockerError = feedback.duration === 0;

  return (
    <ConfirmationModal isReset>
      <StyledHistoryButton
        className="FIE_topbar-reset-button"
        color="basic"
        size="sm"
        disabled={isResetted || isBlockerError}
        showBackButton={showBackButton}
        title={t('resetOperations')}
        margin={margin}
      >
        <Revert />
      </StyledHistoryButton>
    </ConfirmationModal>
  );
};

ResetButton.defaultProps = {
  margin: undefined,
  showBackButton: false,
};

ResetButton.propTypes = {
  margin: PropTypes.string,
  showBackButton: PropTypes.bool,
};

export default ResetButton;
