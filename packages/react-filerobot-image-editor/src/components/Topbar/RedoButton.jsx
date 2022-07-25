/** External Dependencies */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Redo from '@scaleflex/icons/redo';

/** Internal Dependencies */
import { REDO } from 'actions';
import { useStore } from 'hooks';
import { StyledHistoryButton } from './Topbar.styled';

const RedoButton = ({ margin }) => {
  const { dispatch, hasRedo = false, t } = useStore();
  const dispatchRedo = useCallback(() => {
    dispatch({ type: REDO });
  }, []);

  return (
    <StyledHistoryButton
      className="FIE_topbar-redo-button"
      color="link"
      onClick={hasRedo ? dispatchRedo : undefined}
      disabled={!hasRedo}
      title={t('redoTitle')}
      margin={margin}
    >
      <Redo size={12} />
    </StyledHistoryButton>
  );
};

RedoButton.defaultProps = {
  margin: undefined,
};

RedoButton.propTypes = {
  margin: PropTypes.string,
};

export default RedoButton;
