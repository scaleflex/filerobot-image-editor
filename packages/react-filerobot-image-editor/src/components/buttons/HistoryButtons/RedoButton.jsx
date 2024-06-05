/** External Dependencies */
import React, { useCallback } from 'react';
import Redo from '@scaleflex/icons/redo';

/** Internal Dependencies */
import { REDO } from 'actions';
import { useStore } from 'hooks';
import { StyledHistoryButton } from './HistoryButtons.styled';

const RedoButton = (props) => {
  const { dispatch, hasRedo = false, t } = useStore();
  const dispatchRedo = useCallback(() => {
    dispatch({ type: REDO });
  }, []);

  return (
    <StyledHistoryButton
      className="FIE_buttons-redo-btn"
      color="basic"
      size="sm"
      onClick={hasRedo ? dispatchRedo : undefined}
      disabled={!hasRedo}
      title={t('redoTitle')}
      {...props}
    >
      <Redo />
    </StyledHistoryButton>
  );
};

export default RedoButton;
