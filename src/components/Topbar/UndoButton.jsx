/** External Dependencies */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Undo } from '@scaleflex/icons';

/** Internal Dependencies */
import { memoAndMapContextToProps } from 'context';
import { UNDO } from 'actions';
import { StyledHistoryButton } from './Topbar.styles';

const UndoButton = ({ dispatch, hasUndo }) => {
  const dispatchUndo = useCallback(() => {
    dispatch({ type: UNDO });
  }, []);

  return (
    <StyledHistoryButton
      color="link"
      onClick={hasUndo ? dispatchUndo : undefined}
      disabled={!hasUndo}
    >
      <Undo size={12} />
    </StyledHistoryButton>
  );
};

UndoButton.defaultProps = {
  hasUndo: false,
};

UndoButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  hasUndo: PropTypes.bool,
};

export default memoAndMapContextToProps(UndoButton);
