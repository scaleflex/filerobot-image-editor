/** External Dependencies */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Redo } from '@scaleflex/icons';

/** Internal Dependencies */
import { memoAndMapContextToProps } from 'context';
import { REDO } from 'actions';
import { StyledHistoryButton } from './Topbar.styled';

const RedoButton = ({ dispatch, hasRedo }) => {
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

RedoButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  hasRedo: PropTypes.bool,
};

export default memoAndMapContextToProps(RedoButton);
