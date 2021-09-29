/** External Dependencies */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Reset } from '@scaleflex/icons';

/** Internal Dependencies */
import { memoAndMapContextToProps } from 'context';
import { RESET } from 'actions';
import { StyledHistoryButton } from './Topbar.styles';

const ResetButton = ({ dispatch, isResetted }) => {
  const dispatchReset = useCallback(() => {
    dispatch({ type: RESET });
  }, []);

  return (
    <StyledHistoryButton
      color="link"
      onClick={isResetted ? undefined : dispatchReset}
      disabled={isResetted}
    >
      <Reset size={12} />
    </StyledHistoryButton>
  );
};

ResetButton.defaultProps = {
  isResetted: true,
};

ResetButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isResetted: PropTypes.bool,
};

export default memoAndMapContextToProps(ResetButton);
