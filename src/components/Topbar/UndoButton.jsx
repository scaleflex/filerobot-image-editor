/** External Dependencies */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Undo } from '@scaleflex/icons';

/** Internal Dependencies */
import { UNDO } from 'actions';
import { useStore } from 'hooks';
import { StyledHistoryButton } from './Topbar.styled';

const UndoButton = ({ margin }) => {
  const { dispatch, hasUndo = false, t } = useStore();
  const dispatchUndo = useCallback(() => {
    dispatch({ type: UNDO });
  }, []);

  return (
    <StyledHistoryButton
      color="link"
      onClick={hasUndo ? dispatchUndo : undefined}
      disabled={!hasUndo}
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
