/** External Dependencies */
import React, { useCallback } from 'react';
import { Redo } from '@scaleflex/icons';

/** Internal Dependencies */
import { REDO } from 'actions';
import { useStore } from 'hooks';
import { StyledHistoryButton } from './Topbar.styled';

const RedoButton = () => {
  const { dispatch, hasRedo = false } = useStore();
  const dispatchRedo = useCallback(() => {
    dispatch({ type: REDO });
  }, []);

  return (
    <StyledHistoryButton
      color="link"
      onClick={hasRedo ? dispatchRedo : undefined}
      disabled={!hasRedo}
      title="Redo last operation"
    >
      <Redo size={12} />
    </StyledHistoryButton>
  );
};

RedoButton.defaultProps = {
  hasRedo: false,
};

export default RedoButton;
