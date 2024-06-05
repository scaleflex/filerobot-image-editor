/** External Dependencies */
import React, { useCallback } from 'react';
import Undo from '@scaleflex/icons/undo';

/** Internal Dependencies */
import { UNDO } from 'actions';
import { useStore } from 'hooks';
import { StyledHistoryButton } from './HistoryButtons.styled';

const UndoButton = (props) => {
  const { dispatch, hasUndo = false, t, feedback } = useStore();
  const isBlockerError = feedback.duration === 0;
  const dispatchUndo = useCallback(() => {
    dispatch({ type: UNDO });
  }, []);

  return (
    <StyledHistoryButton
      className="FIE_buttons-undo-btn"
      color="basic"
      size="sm"
      onClick={hasUndo ? dispatchUndo : undefined}
      disabled={!hasUndo || isBlockerError}
      title={t('undoTitle')}
      {...props}
    >
      <Undo />
    </StyledHistoryButton>
  );
};

export default UndoButton;
