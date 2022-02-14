/** External Dependencies */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Undo from '@scaleflex/icons/undo';

/** Internal Dependencies */
import { UNDO } from 'actions';
import { useStore } from 'hooks';
import { StyledHistoryButton } from './Topbar.styled';

const UndoButton = ({ margin }) => {
  const { dispatch, hasUndo = false, t, error } = useStore();
  const isBlockerError = error.duration === 0;
  const dispatchUndo = useCallback(() => {
    dispatch({ type: UNDO });
  }, []);

  return (
    <StyledHistoryButton
      color="link"
      onClick={hasUndo ? dispatchUndo : undefined}
      disabled={!hasUndo || isBlockerError}
      title={t('undoTitle')}
      margin={margin}
    >
      <Undo size={12} />
    </StyledHistoryButton>
  );
};

UndoButton.defaultProps = {
  margin: undefined,
};

UndoButton.propTypes = {
  margin: PropTypes.string,
};

export default UndoButton;
